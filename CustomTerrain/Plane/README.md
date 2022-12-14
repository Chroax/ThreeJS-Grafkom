# Jarkom Modul 2 f05 2022

### Anggota:

1. [Andymas Narendra Bagaskara](https://github.com/zaibir123) (05111940000192)
2. [Jayanti Totti Andhina](https://github.com/JayantiTA) (5025201037)
3. [Gaudhiwaa Hendrasto](https://github.com/gaudhiwaa) (5025201066)

## Pembukaan Soal

Twilight (〈黄昏 (たそがれ) 〉, <Tasogare>) adalah seorang mata-mata yang berasal dari negara Westalis. Demi menjaga perdamaian antara Westalis dengan Ostania, Twilight dengan nama samaran Loid Forger (ロイド・フォージャー, Roido Fōjā) di bawah organisasi WISE menjalankan operasinya di negara Ostania dengan cara melakukan spionase, sabotase, penyadapan dan kemungkinan pembunuhan. Berikut adalah peta dari negara Ostania:

![image](media/peta.png)

**1. WISE akan dijadikan sebagai DNS Master, Berlint akan dijadikan DNS Slave, dan Eden akan digunakan sebagai Web Server. Terdapat 2 Client yaitu SSS, dan Garden. Semua node terhubung pada router Ostania, sehingga dapat mengakses internet.**

![image](media/topology.png)

**Ostania** sebagai router
Network configuration:

```
auto eth0
iface eth0 inet dhcp

auto eth1
iface eth1 inet static
	address 10.31.1.1
	netmask 255.255.255.0

auto eth2
iface eth2 inet static
	address 10.31.2.1
	netmask 255.255.255.0

auto eth3
iface eth3 inet static
	address 10.31.3.1
	netmask 255.255.255.0
```

Setup iptables:

```bash
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
sudo sysctl -p
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE -s 10.31.0.0/16
mkdir /etc/iptables
iptables-save > /etc/iptables/rules.v4
clear
echo "iptables has been configured"

```

**WISE** sebagai DNS master
Network configuration:

```
auto eth0
iface eth0 inet static
	address 10.31.2.2
	netmask 255.255.255.0
	gateway 10.31.2.1
```

Instalasi bind9:

```bash
apt update & apt upgrade
apt install bind9 -y
```

**Berlint** sebagai DNS slave
Network configuration:

```
auto eth0
iface eth0 inet static
	address 10.31.3.2
	netmask 255.255.255.0
	gateway 10.31.3.1
```

Instalasi bind9:

```bash
apt update & apt upgrade
apt install bind9 -y
```

**Eden** sebagai web server
Network configuration:

```
auto eth0
iface eth0 inet static
	address 10.31.3.3
	netmask 255.255.255.0
	gateway 10.31.3.1
```

**SSS** sebagai client
Network configuration:

```
auto eth0
iface eth0 inet static
	address 10.31.1.2
	netmask 255.255.255.0
	gateway 10.31.1.1
```

Instalasi dnsutils:

```bash
apt update & apt upgrade
apt install dnsutils -y
```

**Gardent** sebagai client
Network configuration:

```
auto eth0
iface eth0 inet static
	address 10.31.1.3
	netmask 255.255.255.0
	gateway 10.31.1.1
```

Instalasi dnsutils:

```bash
apt update & apt upgrade
apt install dnsutils -y
```

2. Untuk mempermudah mendapatkan informasi mengenai misi dari Handler, bantulah Loid membuat website utama dengan akses wise.yyy.com dengan alias www.wise.yyy.com pada folder wise

Jalankan command berikut untuk melakukan configurasi domain wise.f05.com:

Buat folder wise di dalam /etc/bind

```bash
mkdir /etc/bind/wise
```

```bash
echo 
"zone \"wise.f05.com\" {
	type master;
	file \"/etc/bind/wise/wise.f05.com\";
};" > /etc/bind/named.conf.local
```

Kemudian buka file wise.f05.com dan edit seperti gambar berikut 
```bash
nano /etc/bind/wise/wise.f05.com
```

//

Restart bind9 dengan perintah

```bash
service bind9 restart

ATAU

named -g //Bisa digunakan untuk restart sekaligus debugging
```

Hasil ping wise.f05.com

//

3. Setelah itu ia juga ingin membuat subdomain eden.wise.yyy.com dengan alias www.eden.wise.yyy.com yang diatur DNS-nya di WISE dan mengarah ke Eden

Pada WISE, edit file /etc/bind/wise/wise.f05.com lalu tambahkan subdomain untuk eden.wise.f05.com yang mengarah ke IP Eden.

```bash
nano /etc/bind/wise/wise.f05.com
```

Tambahkan konfigurasi seperti di bawah ke dalam file wise.f05.com.
```bash
eden   IN      A       10.31.2.3
www.eden IN    CNAME   eden.wise.f05.com.
```

//

Restart service bind
```bash
service bind9 restart
```

Ping ke subdomain dengan perintah berikut dari client
```bash 
ping eden.wise.f05.com -c 5

ATAU

host -t A eden.wise.f05.com
```

//

4. Buat juga reverse domain untuk domain utama

Edit file /etc/bind/named.conf.local pada WISE
```bash
nano /etc/bind/named.conf.local
```

Lalu tambahkan konfigurasi berikut ke dalam file named.conf.local. Tambahkan reverse dari 3 byte awal dari IP yang ingin dilakukan Reverse DNS. IP 10.31.2 untuk IP dari records, maka reversenya adalah 2.31.10

```bash
zone "2.31.10.in-addr.arpa" {
    type master;
    file "/etc/bind/wise/2.31.10.in-addr.arpa";
};
```

Copykan file db.local pada path /etc/bind ke dalam folder wise yang baru saja dibuat dan ubah namanya menjadi 2.31.10.in-addr.arpa

```bash
cp /etc/bind/db.local /etc/bind/wise/2.31.10.in-addr.arpa
```

Kemudian restart bind9 dengan perintah
```bash
service bind9 restart
```

Untuk mengecek apakah konfigurasi sudah benar atau belum, lakukan perintah berikut pada client
```bash
apt-get update
apt-get install dnsutils
```
Kembalikan nameserver di /etc/resolv.conf dengan IP WISE 

//

Maka dicek menggunakan command :
```bash
host -t PTR 10.31.2.2
```

//

5. Agar dapat tetap dihubungi jika server WISE bermasalah, buatlah juga Berlint sebagai DNS Slave untuk domain utama

I. Konfigurasi Pada Server WISE
Edit file /etc/bind/named.conf.local dan sesuaikan dengan syntax berikut
```bash
zone "wise.f05.com" {
    type master;
    notify yes;
    also-notify { 10.31.3.2; }; // Masukan IP Berlint 
    allow-transfer { 10.31.3.2; }; // Masukan IP Berlint 
    file "/etc/bind/wise/wise.f05.com";
};
```

//

Lakukan restart bind9
```bash
service bind9 restart
```

II. Konfigurasi pada Server Berlint

Buka Berlint dan update package lists dan install aplikasi bind9 dengan menjalankan command:
```bash
apt-get update
apt-get install bind9 -y
```
Kemudian buka file /etc/bind/named.conf.local pada Berlint dan tambahkan syntax berikut:
```bash
zone "wise.f05.com" {
    type slave;
    masters { 10.31.2.2; }; // Masukan IP WISE
    file "/var/lib/bind/wise.f05.com";
};
```

Lakukan restart bind9
```bash
service bind9 restart
```

III. Testing
Pada server WISE matikan service bind9
```bash
service bind9 stop
```

Pada client pastikan pengaturan nameserver mengarah ke IP WISE dan IP Berlint

//

Lakukan ping ke wise.f05.com pada client. Jika ping berhasil maka konfigurasi DNS slave telah berhasil

//

6. Karena banyak informasi dari Handler, buatlah subdomain yang khusus untuk operation yaitu operation.wise.yyy.com dengan alias www.operation.wise.yyy.com yang didelegasikan dari WISE ke Berlint dengan IP menuju ke Eden dalam folder operation

```bash
nano /etc/bind/wise/wise.f05.com
```

// 

Kemudian edit file /etc/bind/named.conf.options pada WISE.
```bash
nano /etc/bind/named.conf.options
```

Kemudian comment dnssec-validation auto; dan tambahkan baris berikut pada /etc/bind/named.conf.options
```bash
allow-query{any;};
```

Kemudian edit file /etc/bind/named.conf.local menjadi seperti gambar di bawah:
zone "wise.f05.com" {
    type master;
    file "/etc/bind/wise/wise.f05.com";
    allow-transfer { 10.31.3.2; }; // Masukan IP Berlint
};

restart bind9
```bash
service bind9 restart
```
II. Konfigurasi Pada Server Berlint
Pada Berlint edit file /etc/bind/named.conf.options
```bash
nano /etc/bind/named.conf.options
```

Kemudian comment dnssec-validation auto; dan tambahkan baris berikut pada /etc/bind/named.conf.options
```bash
allow-query{any;};
```

Lalu edit file /etc/bind/named.conf.local menjadi seperti gambar di bawah:

//

Kemudian buat direktori dengan nama operation. Copy db.local ke direktori tersebut dan edit namanya menjadi its.jarkom2022.com
```bash
mkdir /etc/bind/operation
cp /etc/bind/db.local /etc/bind/wise/operation.wise.f05.com
```

Kemudian edit file operation.wise.f05.com menjadi seperti dibawah ini
```bash
nano /etc/bind/operation/operation.wise.f05.com
```
Restart bind9
```bash
service bind9 restart
```

III. Testing

Ping operation.wise.f05.com pada client 

//

7. Untuk informasi yang lebih spesifik mengenai Operation Strix, buatlah subdomain melalui Berlint dengan akses strix.operation.wise.yyy.com dengan alias www.strix.operation.wise.yyy.com yang mengarah ke Eden

Pada server Berlint buat domain untuk strix.operation.wise.f05.com dengan alias www.strix.operation.wise.f05.com. Instalasi bind terlebih dahulu
```bash
apt-get update
apt-get install bind9 -y
```
Edit folder operation.wise.f05.com
```bash
nano /etc/bind/operation/operation.wise.f05.com
```
edit seperti dibawah ini :

//

Restart bind9
```bash
service bind9 restart
```

Lakukan ping ke domain strix.operation.wise.f05.com dan www.strix.operation.wise.f05.com dari client

//


**14. Loid meminta agar www.strix.operation.wise.yyy.com hanya bisa diakses dengan port 15000 dan port 15500**

Tambahkan configuration pada /etc/apache2/sites-available/strix.operation.wise.f05.com.conf

![](./media/image17.png)

Setting port

![](./media/image14.png)

Buat folder /var/www/strix.operation.wise.f05.com dan masukkan resource yang ada ke daam folder tersebut

![](./media/image5.png)

Restart apache2 kemudian akses www.strix.operation.wise.yyy.com dari client menggunakan port 15000 atau 15500

![](./media/image11.png)

Jika tanpa port

![](./media/image9.png)

**15. dengan autentikasi username Twilight dan password opStrix dan file di /var/www/strix.operation.wise.yyy**

Masukkan command pada Eden:

![](./media/image4.png)

Tambahkan configuration pada /etc/apache2/sites-available/strix.operation.wise.f05.com.conf

![](./media/image15.png)

Restart apache2 kemudian akses www.strix.operation.wise.yyy.com dari client menggunakan username dan password yang sudah di-setup

![](./media/image6.png)

![](./media/image2.png)

**16. dan setiap kali mengakses IP Eden akan dialihkan secara otomatis ke www.wise.yyy.com**

Tambahkan konfigurasi pada /etc/apache2/sites-available/000-default.conf

![](./media/image10.png)

Tambahkan konfigurasi port apache2

![](./media/image18.png)

Enable 000-default.conf kemudian restart service apache2, akses IP Eden dari client

![](./media/image3.png)

![](./media/image13.png)

**17. Karena website www.eden.wise.yyy.com semakin banyak pengunjung dan banyak modifikasi sehingga banyak gambar-gambar yang random, maka Loid ingin mengubah request gambar yang memiliki substring "eden" akan diarahkan menuju eden.png**

Tambahkan module rewrite pada .htaccess

![](./media/image12.png)

Tambahkan konfigurasi pada /etc/apache2/sites-available/eden.wise.f05.com.conf

![](./media/image19.png)

Kemudian enable module rewrite dan restart service apache2. Akses gambar dari client.

![](./media/image8.png)

![](./media/image1.png)

Jika tanpa 'eden'

![](./media/image7.png)

![](./media/image16.png)