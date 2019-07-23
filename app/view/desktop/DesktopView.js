Ext.define('Desktop.app.view.desktop.DesktopView', {
	extend: 'Ext.ux.desktop.App',
	requires:[
		'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'Desktop.app.view.desktop.SystemStatus',
        'Desktop.app.view.desktop.VideoWindow',
        'Desktop.app.view.desktop.GridWindow',
        'Desktop.app.view.desktop.TabWindow',
        'Desktop.app.view.desktop.AccordionWindow',
        'Desktop.app.view.desktop.Notepad',
        'Desktop.app.view.desktop.BogusMenuModule',
        'Desktop.app.view.desktop.BogusModule',
        'Desktop.app.view.desktop.Settings'

	],


    getModules : function(){
        return [
            new Desktop.app.view.desktop.VideoWindow(),
            new Desktop.app.view.desktop.SystemStatus(),
            new Desktop.app.view.desktop.GridWindow(),
            new Desktop.app.view.desktop.TabWindow(),
            new Desktop.app.view.desktop.AccordionWindow(),
            new Desktop.app.view.desktop.Notepad(),
            new Desktop.app.view.desktop.BogusMenuModule(),
            new Desktop.app.view.desktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'resources/images/wallpapers/Sky.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new Desktop.app.view.desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }

});