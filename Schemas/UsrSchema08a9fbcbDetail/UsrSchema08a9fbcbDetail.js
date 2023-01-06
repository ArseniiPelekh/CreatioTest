define("UsrSchema08a9fbcbDetail", ["ConfigurationGrid", "ConfigurationGridGenerator",
	"ConfigurationGridUtilitiesV2"], function() {
	return {
		entitySchemaName: "UsrPropertyViews",
		attributes: {
			"IsEditable": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			}
		},
		mixins: {
			ConfigurationGridUtilitiesV2: "Terrasoft.ConfigurationGridUtilitiesV2"
		},
		methods: {
			onActiveRowAction: function(buttonTag, primaryColumnValue) {
				this.mixins.ConfigurationGridUtilitiesV2.onActiveRowAction.call(this, buttonTag, primaryColumnValue);
			},
			init: function () {
				this.callParent(arguments);
				this.Terrasoft.ServerChannel.on(
				  Terrasoft.EventName.ON_MESSAGE,
				  this.onServerMessageReceived,
				  this
				);
			  },
			 destroy: function () {
				this.Terrasoft.ServerChannel.un(
				  Terrasoft.EventName.ON_MESSAGE,
				  this.onServerMessageReceived,
				  this
				);
				this.callParent(arguments);
			  },
			  onServerMessageReceived: function (event, message) {
				var messageCode = message && message.Header.Sender;
				if (messageCode === "ViewsAdded") {
				  this.onReleasesCreated();
				}
			  },
			  onReleasesCreated: function () {
                // TODO: Not all posts are loading
                setTimeout(function()
                {
                    this.loadGridData();
                }.bind(this), 1000);
			  },
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
					"changeRow": {"bindTo": "changeRow"},
					"unSelectRow": {"bindTo": "unSelectRow"},
					"onGridClick": {"bindTo": "onGridClick"},
					"activeRowActions": [
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "save",
							"markerValue": "save",
							"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "cancel",
							"markerValue": "cancel",
							"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "card",
							"markerValue": "card",
							"imageConfig": {"bindTo": "Resources.Images.CardIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "copy",
							"markerValue": "copy",
							"imageConfig": {"bindTo": "Resources.Images.CopyIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "remove",
							"markerValue": "remove",
							"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
						}
					],
					"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
					"activeRowAction": {"bindTo": "onActiveRowAction"},
					"multiSelect": {"bindTo": "MultiSelect"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});