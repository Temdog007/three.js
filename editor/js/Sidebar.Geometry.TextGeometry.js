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
    textRow.add(new UI.Text("Text").setWidth('90px'), text);
    
    return container;
}

Sidebar.Geometry.TextBufferGeometry = Sidebar.Geometry.TextGeometry;