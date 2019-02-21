/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Settings = function ( editor ) {

	var config = editor.config;
	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setPaddingBottom( '20px' );

	// language

	var options = {
		en: 'English',
		zh: '中文'
	};

	var languageRow = new UI.Row();
	var language = new UI.Select().setWidth( '150px' );
	language.setOptions( options );

	if ( config.getKey( 'language' ) !== undefined ) {

		language.setValue( config.getKey( 'language' ) );

	}

	language.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'language', value );

	} );

	languageRow.add( new UI.Text( strings.getKey( 'sidebar/settings/language' ) ).setWidth( '90px' ) );
	languageRow.add( language );

	container.add( languageRow );

	// theme

	var options = {
		'css/light.css': strings.getKey( 'sidebar/settings/theme/light' ),
		'css/dark.css': strings.getKey( 'sidebar/settings/theme/dark' )
	};

	var themeRow = new UI.Row();
	var theme = new UI.Select().setWidth( '150px' );
	theme.setOptions( options );

	if ( config.getKey( 'theme' ) !== undefined ) {

		theme.setValue( config.getKey( 'theme' ) );

	}

	theme.onChange( function () {

		var value = this.getValue();

		editor.setTheme( value );
		editor.config.setKey( 'theme', value );

	} );

	themeRow.add( new UI.Text( strings.getKey( 'sidebar/settings/theme' ) ).setWidth( '90px' ) );
	themeRow.add( theme );

	container.add( themeRow );

	container.add( new Sidebar.Settings.Shortcuts( editor ) );
	container.add( new Sidebar.Settings.Viewport( editor ) );

	// export scripts with objects

	var exportScriptToObjectRow = new UI.Row().setMarginTop( "10px" );
	container.add( exportScriptToObjectRow );

	exportScriptToObjectRow.add( new UI.Text( strings.getKey( 'sidebar/settings/exportObject' ) ).setWidth( '200px' ) );

	var exportScriptToObject = new UI.THREE.Boolean( config.getKey( 'settings/exportScriptsToObject' ) ).onChange( function () {

		config.setKey( 'settings/exportScriptsToObject', exportScriptToObject.getValue() );

	} );
	exportScriptToObjectRow.add( exportScriptToObject );

	return container;

};
