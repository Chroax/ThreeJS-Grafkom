function translateCoordinate(dim,seg,x,z){
    var dif = dim / seg;
    var minimum = - (dim >> 1);
    var dif_x = (x - minimum) / dif;
    var dif_z = (z - minimum) / dif;
    var i = (dif_x + dif_z * (seg + 1)) * 3;
    return i;
}

