sap.ui.define([], function() {
    'use strict';
    return sap.ui.controller('audi.fi.ar.customerItems.debitorenposten1.ext.controller.customMain',{
        firstRun : true,
        cIdOPVariant : 'id_1656512948995_561_table', //'id_1655135758770_191_table',
        cIdISTVariant : 'id_1656512858638_460_table', //'id_1654003923705_384_table',
        onInitSmartFilterBarExtension: function(){
            //Get the reference of Smartfilter bar
            var oSmartFilter = this.getView().byId('template::SmartFilterBar');
            
            //Set Default values for mandatory parameters
            var dateToday = new Date();
            var firstDayCurrentMonth = new Date(dateToday.getFullYear(), dateToday.getMonth(), 1);
            var oDefaultFilter = {
                CompanyCode: '0200',
                ident:'OP',
                "$Parameter.p_stichtag": firstDayCurrentMonth
            };
            oSmartFilter.setFilterData(oDefaultFilter);
            
            oSmartFilter.getControlByKey('ident').attachSelectionChange(this._onIdentChange);
        },
        _onIdentChange:function(oEvent){
            var identValue = oEvent.getSource().getValue();
            var oSmartFilter = oEvent.getSource().getParent().getParent().getParent();
            var oVarMgmt = oSmartFilter.getParent().getParent().getParent().getParent().getParent().byId('table-variant')
            var allFilters = oSmartFilter.getAllFilterItems();
            var kDateIndex = 0;
            var pDateIndex = 0;
            var dTypeIndex = 0;

            var dateToday = new Date();
            var firstDayPrevMonth = new Date(dateToday.getFullYear(), dateToday.getMonth() - 1, 1);
            var lastDayPrevMonth = new Date(dateToday.getFullYear(), dateToday.getMonth(), 0);

            var oDefaultFilter = oSmartFilter.getFilterData();
            if (!oDefaultFilter.PostingDate || oDefaultFilter.PostingDate === null || oDefaultFilter.PostingDate === ''){
                oDefaultFilter.PostingDate = {
                    "ranges" : [
                        {
                            exclude: false, 
                            operation: 'BT', 
                            keyField: 'PostingDate', 
                            value1: firstDayPrevMonth, 
                            value2: lastDayPrevMonth
                        }
                    ]};
                oDefaultFilter.DocumentType = {
                    "ranges" : [
                        {
                            exclude: false, 
                            operation: 'EQ', 
                            keyField: 'DocumentType', 
                            value1: 'BK'
                        },
                        {
                            exclude: false, 
                            operation: 'EQ', 
                            keyField: 'DocumentType', 
                            value1: 'BZ'
                        },
                        {
                            exclude: false, 
                            operation: 'EQ', 
                            keyField: 'DocumentType', 
                            value1: 'D4'
                        },
                        {
                            exclude: false, 
                            operation: 'EQ', 
                            keyField: 'DocumentType', 
                            value1: 'DT'
                        }
                    ]};
            }            

            for( var i = 0; i < allFilters.length; i++){
                var kDate = allFilters[i];
                if ( kDate.getProperty('name') === '$Parameter.p_stichtag' ) {
                    kDateIndex = i;
                }else if ( kDate.getProperty('name') === 'PostingDate' ) {
                    pDateIndex = i;
                }else if ( kDate.getProperty('name') === 'DocumentType' ) {
                    dTypeIndex = i;
                }
            }
            var keyDateFilterControl = allFilters[kDateIndex];
            var postingDateFilterControl = allFilters[pDateIndex];
            var documentTypeFilterControl = allFilters[dTypeIndex];

            if ( identValue === 'Ist' ){
                keyDateFilterControl.setVisibleInFilterBar(false);
                documentTypeFilterControl.setVisibleInFilterBar();
                postingDateFilterControl.setMandatory(true);
                if (oSmartFilter.getFilterData().PostingDate === undefined || oSmartFilter.getFilterData().PostingDate === ''){
                    oSmartFilter.setFilterData(oDefaultFilter);
                }
            } 
            else {
                keyDateFilterControl.setVisibleInFilterBar(true);
                keyDateFilterControl.setVisibleInAdvancedArea(true);
                postingDateFilterControl.setMandatory(false);
            }
            if ((oVarMgmt.getCurrentVariantId() !== cIdOPVariant) &&
                ( oSmartFilter.getFilterData().ident === 'OP' ))
            {
                oVarMgmt.setCurrentVariantId(this.cIdOPVariant);
            }else if ((oVarMgmt.getCurrentVariantId() !== cIdISTVariant) &&
                    ( oSmartFilter.getFilterData().ident === 'IST' ))
            {
                oVarMgmt.setCurrentVariantId(this.cIdISTVariant);
            }
        },
        onBeforeRebindTableExtension: function(){
            var oVarMgmt = this.getView().byId('table-variant');
            if (this.firstRun === true){
                oVarMgmt.setCurrentVariantId(this.cIdOPVariant);
                this.firstRun = false;
            }
        }
    });
});