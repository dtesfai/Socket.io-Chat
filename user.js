function populateList(arr){
    var str = '';
    for(var i = 0; i < arr.length; i++){
        str += '<li>' + arr[i] + '</li>';
    }
    return str;
}