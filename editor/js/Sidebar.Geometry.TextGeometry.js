/**
 * @author Temdog007 / http://github.com/Temdog007
 */

Sidebar.Geometry.TextGeometry = function ( editor, object ) {

    var strings = editor.strings;

    var container = new UI.Row();

    var geometry = object.geometry;
	var options = geometry.parameters.options;

	// text

    var textRow = new UI.Row();
    container.add(textRow);

    var text = new UI.Input( geometry.text ).onChange( update );
    textRow.add(new UI.Text( strings.getKey( 'sidebar/geometry/text_geometry/text' ) ).setWidth('90px'), text);

    // bevelEnabled

    var bevelEnabledRow = new UI.Row();
    container.add(bevelEnabledRow);

	var bevelEnabled = new UI.Checkbox( options.bevelEnabled ).onChange( update );
	bevelEnabledRow.add( new UI.Text( strings.getKey( 'sidebar/geometry/text_geometry/bevelenabled' ) ).setWidth( '90px' ), bevelEnabled );

    // bevelSize

    var bevelSizeRow = new UI.Row();
    container.add(bevelSizeRow);

	var bevelSize = new UI.Number( options.bevelSize ).onChange( update );
    bevelSizeRow.add( new UI.Text( strings.getKey( 'sidebar/geometry/text_geometry/bevelsize' ) ).setWidth( '90px' ), bevelSize );

    // bevelThickness

    var bevelThicknessRow = new UI.Row();
    container.add(bevelThicknessRow);

	var bevelThickness = new UI.Number( options.bevelThickness ).onChange( update );
    bevelThicknessRow.add( new UI.Text( strings.getKey( 'sidebar/geometry/text_geometry/bevelthickness' ) ).setWidth( '90px' ), bevelThickness );

    // curveSegments

    var curveSegmentsRow = new UI.Row();
    container.add(curveSegmentsRow);

	var curveSegments = new UI.Integer( options.curveSegments ).setRange(1, Infinity).onChange( update );
    curveSegmentsRow.add( new UI.Text( strings.getKey( 'sidebar/geometry/text_geometry/curvesegments' ) ).setWidth( '90px' ), curveSegments );

    // height

    var heightRow = new UI.Row();
    container.add(heightRow);

	var height = new UI.Number( options.height ).onChange( update );
    heightRow.add( new UI.Text( strings.getKey( 'sidebar/geometry/text_geometry/height' ) ).setWidth( '90px' ), height );

    // size

    var sizeRow = new UI.Row();
    container.add(sizeRow);

	var size = new UI.Number( options.size ).onChange( update );
    sizeRow.add( new UI.Text( strings.getKey( 'sidebar/geometry/text_geometry/size' ) ).setWidth( '90px' ), size );

    // font
    var fontRow = new UI.Row();
    container.add(fontRow);

    var fontOptions = {};
    var files = editor.fonts.files;
    for(var i = 0; i < files.length; ++i)
    {
        fontOptions[files[i]] = files[i];
    }
    var font = new UI.Select().onChange(update).setOptions(fontOptions).setWidth('160px');
    if(options.font !== undefined)
    {
        font.setValue(options.font.name || "gentilis_bold");
    }
    fontRow.add(new UI.Text(strings.getKey( 'sidebar/geometry/text_geometry/font' ) ).setWidth( '90px' ), font);
    
    //

	function update() {

        var currentFont = editor.fonts[font.getValue()] || editor.fonts.gentilis_bold;

		editor.execute( new SetGeometryCommand( editor, object, new THREE[ geometry.type ](
            text.getValue(), {
                bevelEnabled : bevelEnabled.getValue(),
                bevelSize : bevelSize.getValue(),
                bevelThickness : bevelThickness.getValue(),
                curveSegments : curveSegments.getValue(),
                height : height.getValue(),
                size : size.getValue(),
                font : currentFont
            }
		) ) );

	}
    
    return container;
}

Sidebar.Geometry.TextBufferGeometry = Sidebar.Geometry.TextGeometry;