define("UsrRealEstate1Page", [], function() {
	return {
		entitySchemaName: "UsrRealEstate",
		attributes: {
            "UsrTypeSentence": {
                lookupListConfig: {
                   columns: ["UsrCommission"]
                }
            },
			"UsrCommission": {
                dataValueType: Terrasoft.DataValueType.FLOAT,
                dependencies: [
                    {
                        columns: ["UsrTypeSentence", "UsrPriceUsd"],
                        methodName: "calculateCommission"
                    }
                ]
            }
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrRealEstateFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrRealEstate"
				}
			},
			"UsrSchema08a9fbcbDetailb60533ef": {
				"schemaName": "UsrSchema08a9fbcbDetail",
				"entitySchemaName": "UsrPropertyViews",
				"filter": {
					"detailColumn": "UsrRealEstate",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrDescription": {
				"cd4e6425-2c11-4858-869e-85aa5a3b2f4c": {
					"uId": "cd4e6425-2c11-4858-869e-85aa5a3b2f4c",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrPriceUsd"
							},
							"rightExpression": {
								"type": 0,
								"value": 100000,
								"dataValueType": 5
							}
						}
					]
				}
			},
			"UsrSquare": {
				"05beba9e-dcc0-480f-a403-8736cdc21448": {
					"uId": "05beba9e-dcc0-480f-a403-8736cdc21448",
					"enabled": true,
					"removed": true,
					"ruleType": 3,
					"populatingAttributeSource": {
						"expression": {
							"type": 6,
							"formula": {
								"type": 0,
								"dataType": 31,
								"operatorType": 1,
								"leftExpression": {
									"type": 1,
									"dataType": 31,
									"operandType": 1,
									"columnPath": "UsrSquare",
									"columnOperandType": 0
								},
								"rightExpression": {
									"type": 1,
									"dataType": 4,
									"operandType": 0,
									"value": "0"
								},
								"arithmeticOperatorType": 2
							}
						}
					},
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 5,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrSquare"
							},
							"rightExpression": {
								"type": 0,
								"value": 0,
								"dataValueType": 5
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
	        squareValidator: function() {
	          var errorMessage = null;
	          if (this.get("UsrSquare") < 0) {
	            errorMessage = this.get("Resources.Strings.ValueCannotBeLessThanNull");;
	          }
	          return {
	            invalidMessage: errorMessage
	          };
	        },
	        priceUsdValidator: function() {
	          var errorMessage = null;
	          if (this.get("UsrPriceUsd") < 0) {
	            errorMessage = this.get("Resources.Strings.ValueCannotBeLessThanNull");;
	          }
	          return {
	            invalidMessage: errorMessage
	          };
	        },
	        setValidationConfig: function() {
	          this.callParent(arguments);
	          this.addColumnValidator("UsrSquare", this.squareValidator);
	          this.addColumnValidator("UsrPriceUsd", this.priceUsdValidator);
	        },
            calculateCommission: function() {
                var typeSentence = this.get("UsrTypeSentence");
                var commissionInProcent = typeSentence.UsrCommission;
                var priceUsd = this.get("UsrPriceUsd");
                // Can be set to 0
                if((typeSentence || typeSentence == 0)
                    && (commissionInProcent || commissionInProcent == 0)
                    && (priceUsd || priceUsd == 0))
                {
                    var commission = priceUsd*commissionInProcent/100;
                    this.set("UsrCommission", commission)
                    return;
                }
                this.set("UsrCommission", 0);
          	}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrNamef1f682ef-a7fa-4bd9-896c-98251e4f48a4",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FLOAT6c2dd116-9e22-48ca-87ba-f300143193d8",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPriceUsd",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FLOAT1de15b57-bde8-4698-b8df-325084288841",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSquare",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUP36442b55-92b4-4d1d-80ce-434fdff3f5c6",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrType",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUP183dd72c-434d-4dd8-bd1b-a86c265015df",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrTypeSentence",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "STRING69a512b0-78c3-4107-bf74-600851f677c0",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrDescription",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "FLOAT28e007b5-21d2-484c-bb11-3ec4cc88f90c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCommission",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "Tabbf18faebTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabbf18faebTabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema08a9fbcbDetailb60533ef",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabbf18faebTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
