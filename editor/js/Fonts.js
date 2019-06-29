/** 
* @author Temdog007 / http://github.com/Temdog007
*/

var Fonts = function (  ) {
    this.files = [
        "gentilis_bold",
        "helvetiker_bold",
        "optimer_bold",
        "gentilis_regular",
        "helvetiker_regular",
        "optimer_regular",
        "droid_sans_bold",
        "droid_sans_mono_regular",
        "droid_sans_regular",
        "droid_serif_bold",
        "droid_serif_regular"
    ];

    var scope = this;
    var loader = new THREE.FontLoader();
    for(var i = 0; i < this.files.length; ++i)
    {
        storeFont(this.files[i]);
    }

    function storeFont(name)
    {
        loader.load('fonts/' + name + ".typeface.json", function(font)
        {
            font.name = name;
            scope[name] = font;
        });
    }
}