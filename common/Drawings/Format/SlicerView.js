/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";

(function() {

    AscDFH.drawingsChangesMap[AscDFH.historyitem_SlicerViewName] = function(oClass, value){oClass.name = value;};
    AscDFH.changesFactory[AscDFH.historyitem_SlicerViewName] = window['AscDFH'].CChangesDrawingsString;

    var LEFT_PADDING = 3;
    var RIGHT_PADDING = 3;
    var BOTTOM_PADDING = 3;
    var TOP_PADDING = 2;
    var SPACE_BETWEEN = 1.5;
    var HEADER_BUTTON_WIDTH = RIGHT_PADDING * 175 / 73;
    var HEADER_TOP_PADDING = RIGHT_PADDING;
    var HEADER_BOTTOM_PADDING = HEADER_TOP_PADDING;
    var HEADER_LEFT_PADDING = LEFT_PADDING;
    var HEADER_RIGHT_PADDING = 2*RIGHT_PADDING + 2*HEADER_BUTTON_WIDTH;
    var SCROLL_WIDTH = 17 * 25.4 / 96;
    var SCROLLER_WIDTH = 13 * 25.4 / 96;

    var STATE_FLAG_WHOLE = 1;
    var STATE_FLAG_HEADER = 2;
    var STATE_FLAG_SELECTED = 4;
    var STATE_FLAG_DATA = 8;
    var STATE_FLAG_HOVERED = 16;

    var SCROLL_TIMER_INTERVAL = 200;

    var STYLE_TYPE = {};
    STYLE_TYPE.WHOLE = STATE_FLAG_WHOLE;
    STYLE_TYPE.HEADER = STATE_FLAG_HEADER;
    STYLE_TYPE.SELECTED_DATA = STATE_FLAG_SELECTED | STATE_FLAG_DATA | 0;
    STYLE_TYPE.SELECTED_NO_DATA = STATE_FLAG_SELECTED | 0 | 0;
    STYLE_TYPE.UNSELECTED_DATA = 0 | STATE_FLAG_DATA | 0;
    STYLE_TYPE.UNSELECTED_NO_DATA = 0 | 0 | 0;
    STYLE_TYPE.HOVERED_SELECTED_DATA = STATE_FLAG_SELECTED | STATE_FLAG_DATA | STATE_FLAG_HOVERED;
    STYLE_TYPE.HOVERED_SELECTED_NO_DATA = STATE_FLAG_SELECTED | 0 | STATE_FLAG_HOVERED;
    STYLE_TYPE.HOVERED_UNSELECTED_DATA = 0 | STATE_FLAG_DATA | STATE_FLAG_HOVERED;
    STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA = 0 | 0 | STATE_FLAG_HOVERED;
    
    var SCROLL_COLORS = {};
    SCROLL_COLORS[STYLE_TYPE.WHOLE] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.HEADER] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.SELECTED_DATA] = 0xADADAD;
    SCROLL_COLORS[STYLE_TYPE.SELECTED_NO_DATA] = 0xADADAD;
    SCROLL_COLORS[STYLE_TYPE.UNSELECTED_DATA] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.UNSELECTED_NO_DATA] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_SELECTED_DATA] = 0xADADAD;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = 0xADADAD;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = 0xCFCFCF;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = 0xCFCFCF;

    var SCROLL_BUTTON_TYPE_LEFT = 0;
    var SCROLL_BUTTON_TYPE_TOP = 1;
    var SCROLL_BUTTON_TYPE_RIGHT = 2;
    var SCROLL_BUTTON_TYPE_BOTTOM = 3;
    
    var SCROLL_ARROW_COLORS = {};
    SCROLL_ARROW_COLORS[STYLE_TYPE.WHOLE] = 0xF1F1F1;
    SCROLL_ARROW_COLORS[STYLE_TYPE.HEADER] = 0xF1F1F1;
    SCROLL_ARROW_COLORS[STYLE_TYPE.SELECTED_DATA] = 0xFFFFFF;
    SCROLL_ARROW_COLORS[STYLE_TYPE.SELECTED_NO_DATA] = 0xFFFFFF;
    SCROLL_ARROW_COLORS[STYLE_TYPE.UNSELECTED_DATA] = 0xADADAD;
    SCROLL_ARROW_COLORS[STYLE_TYPE.UNSELECTED_NO_DATA] = 0xADADAD;
    SCROLL_ARROW_COLORS[STYLE_TYPE.HOVERED_SELECTED_DATA] = 0xFFFFFF;
    SCROLL_ARROW_COLORS[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = 0xFFFFFF;
    SCROLL_ARROW_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = 0xFFFFFF;
    SCROLL_ARROW_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = 0xFFFFFF;
    
    var HEADER_BUTTON_COLORS = {};
    HEADER_BUTTON_COLORS[STYLE_TYPE.WHOLE] = null;
    HEADER_BUTTON_COLORS[STYLE_TYPE.HEADER] = null;
    HEADER_BUTTON_COLORS[STYLE_TYPE.SELECTED_DATA] = 0x7D858C;
    HEADER_BUTTON_COLORS[STYLE_TYPE.SELECTED_NO_DATA] = 0x7D858C;
    HEADER_BUTTON_COLORS[STYLE_TYPE.UNSELECTED_DATA] = null;
    HEADER_BUTTON_COLORS[STYLE_TYPE.UNSELECTED_NO_DATA] = null;
    HEADER_BUTTON_COLORS[STYLE_TYPE.HOVERED_SELECTED_DATA] = 0x7D858C;
    HEADER_BUTTON_COLORS[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = 0x7D858C;
    HEADER_BUTTON_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = 0xD8DADC;
    HEADER_BUTTON_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = 0xD8DADC;
    
    var ICON_MULTISELECT = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCA1QzQgNC40NDc3MiA0LjQ0NzcyIDQgNSA0SDE1QzE1LjU1MjMgNCAxNiA0LjQ0NzcyIDE2IDVWNkMxNiA2LjU1MjI4IDE1LjU1MjMgNyAxNSA3SDVDNC40NDc3MiA3IDQgNi41NTIyOCA0IDZWNVpNMTUgMTNINUw1IDE0SDE1VjEzWk01IDEyQzQuNDQ3NzIgMTIgNCAxMi40NDc3IDQgMTNWMTRDNCAxNC41NTIzIDQuNDQ3NzIgMTUgNSAxNUgxNUMxNS41NTIzIDE1IDE2IDE0LjU1MjMgMTYgMTRWMTNDMTYgMTIuNDQ3NyAxNS41NTIzIDEyIDE1IDEySDVaTTUgOEM0LjQ0NzcyIDggNCA4LjQ0NzcyIDQgOVYxMEM0IDEwLjU1MjMgNC40NDc3MiAxMSA1IDExSDE1QzE1LjU1MjMgMTEgMTYgMTAuNTUyMyAxNiAxMFY5QzE2IDguNDQ3NzIgMTUuNTUyMyA4IDE1IDhINVoiIGZpbGw9IiM0NDQ0NDQiLz4NCjwvc3ZnPg0K";
    var ICON_MULTISELECT_INVERTED = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCA1QzQgNC40NDc3MiA0LjQ0NzcyIDQgNSA0SDE1QzE1LjU1MjMgNCAxNiA0LjQ0NzcyIDE2IDVWNkMxNiA2LjU1MjI4IDE1LjU1MjMgNyAxNSA3SDVDNC40NDc3MiA3IDQgNi41NTIyOCA0IDZWNVpNMTUgMTNINUw1IDE0SDE1VjEzWk01IDEyQzQuNDQ3NzIgMTIgNCAxMi40NDc3IDQgMTNWMTRDNCAxNC41NTIzIDQuNDQ3NzIgMTUgNSAxNUgxNUMxNS41NTIzIDE1IDE2IDE0LjU1MjMgMTYgMTRWMTNDMTYgMTIuNDQ3NyAxNS41NTIzIDEyIDE1IDEySDVaTTUgOEM0LjQ0NzcyIDggNCA4LjQ0NzcyIDQgOVYxMEM0IDEwLjU1MjMgNC40NDc3MiAxMSA1IDExSDE1QzE1LjU1MjMgMTEgMTYgMTAuNTUyMyAxNiAxMFY5QzE2IDguNDQ3NzIgMTUuNTUyMyA4IDE1IDhINVoiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==";
    var ICON_CLEAR_FILTER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAgMTZMOCAxNFYxMEwzIDVIMTVMMTAgMTBWMTZaTTE2LjE0NjQgMTYuODUzNkwxNC41IDE1LjIwNzFMMTIuODUzNiAxNi44NTM2TDEyLjE0NjQgMTYuMTQ2NUwxMy43OTI5IDE0LjVMMTIuMTQ2NCAxMi44NTM2TDEyLjg1MzYgMTIuMTQ2NUwxNC41IDEzLjc5MjlMMTYuMTQ2NCAxMi4xNDY1TDE2Ljg1MzYgMTIuODUzNkwxNS4yMDcxIDE0LjVMMTYuODUzNiAxNi4xNDY1TDE2LjE0NjQgMTYuODUzNloiIGZpbGw9IiM0NDQ0NDQiLz4NCjwvc3ZnPg0K";
    var ICON_CLEAR_FILTER_DISABLED = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIG9wYWNpdHk9IjAuNCI+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDE2TDggMTRWMTBMMyA1SDE1TDEwIDEwVjE2Wk0xNi4xNDY0IDE2Ljg1MzZMMTQuNSAxNS4yMDcxTDEyLjg1MzYgMTYuODUzNkwxMi4xNDY0IDE2LjE0NjVMMTMuNzkyOSAxNC41TDEyLjE0NjQgMTIuODUzNkwxMi44NTM2IDEyLjE0NjVMMTQuNSAxMy43OTI5TDE2LjE0NjQgMTIuMTQ2NUwxNi44NTM2IDEyLjg1MzZMMTUuMjA3MSAxNC41TDE2Ljg1MzYgMTYuMTQ2NUwxNi4xNDY0IDE2Ljg1MzZaIiBmaWxsPSIjNDQ0NDQ0Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
    
    function getSlicerIconsForLoad() {
        return [ICON_MULTISELECT, ICON_MULTISELECT_INVERTED, ICON_CLEAR_FILTER, ICON_CLEAR_FILTER_DISABLED];
    }
    
    function CreateButtonHoverGradient() {
        var oFill = new AscCommonExcel.Fill(), oGF, oGS;
        oGF = new AscCommonExcel.GradientFill();
        oGS = new AscCommonExcel.GradientStop();
        oGS.position = 0;
        oGS.color = AscCommonExcel.createRgbColor(248, 225, 98);
        oGF.stop.push(oGS);
        oGS = new AscCommonExcel.GradientStop();
        oGS.color = AscCommonExcel.createRgbColor(252, 247, 224);
        oGS.position = 1;
        oGF.stop.push(oGS);
        oGF.degree = 90;
        oFill.gradientFill = oGF;
        return oFill;
    }
    
    function CTextBox(txBody, transformText) {
        this.txBody = txBody;
        this.transformText = transformText;
    }
    
    function CSlicerData(slicer) {
        this.slicer = slicer;

        this.values = null;
        this.view = null;
    }
    CSlicerData.prototype.clear = function() {
        this.values = null;
        this.view = null;
    };
    CSlicerData.prototype.hasData = function() {
        return this.values !== null && this.view !== null;
    };
    CSlicerData.prototype.getWorksheet = function() {
        return this.slicer.worksheet;
    };
    CSlicerData.prototype.retrieveData = function() {
        this.clear();
        var oWorksheet = this.getWorksheet();
        if(!oWorksheet) {
            return;
        }
        var sName = this.slicer.getName();
        var oView = oWorksheet.getSlicerByName(sName);
        if(!oView || !oView.obj) {
            return;
        }
        var oCache = oView.obj.getCacheDefinition();
        if(!oCache) {
            return;
        }
        var oValues = oCache.getFilterValues();
        if(!oValues || !Array.isArray(oValues.values)) {
            return;
        }
        this.values = oValues.values;
        this.view = oView.obj;
    };
    CSlicerData.prototype.checkData = function() {
        if(!this.hasData()) {
            this.retrieveData();
        }
    };
    CSlicerData.prototype.getValues = function() {
        this.checkData();
        if(Array.isArray(this.values)) {
            return this.values;
        }
        return [];
    };
    CSlicerData.prototype.getValuesCount = function () {
        return this.getValues().length;
    };
    CSlicerData.prototype.getCaption = function() {
        this.checkData();
        if(this.view && typeof this.view.caption === "string") {
            return this.view.caption;
        }
        return "";
    };
    CSlicerData.prototype.getShowCaption = function() {
        this.checkData();
        if(this.view) {
            return this.view.showCaption !== false;
        }
        return false;
    };
    CSlicerData.prototype.getColumnsCount = function() {
        this.checkData();
        if(this.view && AscFormat.isRealNumber(this.view.columnCount)) {
            return this.view.columnCount;
        }
        return 1;
    };
    CSlicerData.prototype.getButtonHeight = function() {
        this.checkData();
        if(this.view && AscFormat.isRealNumber(this.view.rowHeight)) {
            return this.view.rowHeight * g_dKoef_emu_to_mm;
        }
        return 0.26 * 25.4;
    };
    CSlicerData.prototype.getValue = function (nIndex) {
        if(nIndex > -1 && nIndex < this.getValuesCount()) {
            return this.getValues()[nIndex];
        }
        return null;
    };
    CSlicerData.prototype.getVal = function(oValue) {
        if(!oValue) {
            return null;
        }
        return oValue.val;
    };
    CSlicerData.prototype.getVisible = function(oValue) {
        if(!oValue) {
            return null;
        }
        return oValue.visible !== false;
    };
    CSlicerData.prototype.getButtonState = function (nIndex) {
        var oValue = this.getValue(nIndex);
        if(oValue) {
            var nState = 0;
            if(this.getVal(oValue) !== null) {
                nState |= STATE_FLAG_DATA;
            }
            if(this.getVisible(oValue) !== false) {
                nState |=STATE_FLAG_SELECTED;
            }
            return nState;
        }
        return STYLE_TYPE.WHOLE;
    };
    CSlicerData.prototype.isAllValuesSelected = function () {
        var nCount = this.getValuesCount();
        for(var nValue = 0; nValue < nCount; ++nValue) {
            var oValue = this.getValue(nValue);
            if(oValue && oValue.visible === false) {
                return false;
            }
        }
        return true;
    };
    CSlicerData.prototype.getString = function (nIndex) {
        var oValue = this.getValue(nIndex);
        if(oValue && typeof oValue.text === "string") {
            return oValue.text;
        }
        return "";
    };
    CSlicerData.prototype.onViewUpdate = function () {
        var oWSView;//Why we need wsView?!!
        var oWorksheet = this.getWorksheet();
        if(!oWorksheet) {
            this.slicer.removeAllButtonsTmpState();
            return;
        }
        oWSView = Asc.editor.wb.getWorksheetById(oWorksheet.Id, true);//
        if(!oWSView) {
            this.slicer.removeAllButtonsTmpState();
            return;
        }
        var nValuesCount = this.getValuesCount(), nValue, oValue, oApplyValue, nButtonState;
        var aValuesToApply = [];
        var bNeedUpdate = false;
        for(nValue = 0; nValue < nValuesCount; ++nValue) {
            oValue = this.getValue(nValue);
            if(!oValue) {
                break;
            }
            nButtonState = this.slicer.getViewButtonState(nValue);
            if(nButtonState === null) {
                break;
            }
            oApplyValue = oValue.clone();
            var bVisible = (nButtonState & STATE_FLAG_SELECTED) !== 0;
            if(this.getVisible(oValue) !== bVisible) {
                oApplyValue.asc_setVisible(bVisible);
                bNeedUpdate = true;
            }
            aValuesToApply.push(oApplyValue);
        }
        if(bNeedUpdate) {
            oWSView.setFilterValuesFromSlicer(this.slicer.getName(), aValuesToApply);
        }
        else {
            this.slicer.removeAllButtonsTmpState();
        }
    };

    function CSlicer() {
        AscFormat.CShape.call(this);
        this.name = null;

        this.recalcInfo.recalculateHeader = true;
        this.recalcInfo.recalculateButtons = true;
        this.header = null;

        this.data = new CSlicerData(this);

        AscFormat.ExecuteNoHistory(function() {
            this.txStyles = new CStyles(false);
        }, this, []);

        this.buttonsContainer = null;

        this.eventListener = null;
    }
    CSlicer.prototype = Object.create(AscFormat.CShape.prototype);
    CSlicer.prototype.constructor = CSlicer;
    CSlicer.prototype.getObjectType = function () {
        return AscDFH.historyitem_type_SlicerView;
    };
    CSlicer.prototype.toStream = function (s) {
        s.WriteUChar(AscCommon.g_nodeAttributeStart);
        s._WriteString2(0, this.name);
        s.WriteUChar(AscCommon.g_nodeAttributeEnd);
    };
    CSlicer.prototype.fromStream = function (s) {
        var _len = s.GetULong();
        var _start_pos = s.cur;
        var _end_pos = _len + _start_pos;
        var _at;
// attributes
        s.GetUChar();
        while (true) {
            _at = s.GetUChar();
            if (_at === AscCommon.g_nodeAttributeEnd)
                break;
            switch (_at) {
                case 0: {
                    this.setName(s.GetString2());
                    break;
                }
                default: {
                    s.Seek2(_end_pos);
                    return;
                }
            }
        }
        s.Seek2(_end_pos);
    };
    CSlicer.prototype.setName = function(val) {
        History.Add(new AscDFH.CChangesDrawingsString(this, AscDFH.historyitem_SlicerViewName, this.name, val));
        this.name = val;
    };
    CSlicer.prototype.getName = function() {
        return this.name;
    };
    CSlicer.prototype.getViewButtonsCount = function () {
        if(!this.buttonsContainer) {
            return 0;
        }
        return this.buttonsContainer.getViewButtonsCount();
    };
    CSlicer.prototype.getViewButtonState = function(nIndex) {
        if(!this.buttonsContainer) {
            return null;
        }
        return this.buttonsContainer.getViewButtonState(nIndex);
    };
    CSlicer.prototype.getFont = function(nType) {
        var oFont = new AscCommonExcel.Font();//TODO: Take font from slicerStyle when it will be implemented.
        oFont.setSize(11);
        if(nType === STYLE_TYPE.HEADER) {
            oFont.setBold(true);
        }
        return oFont;
    };
    CSlicer.prototype.getFill = function(nType) {
        var oFill;//TODO: Take background from styles when it will be implemented
        var nColor = 0xFFFFFF;
        if(nType & STATE_FLAG_HOVERED) {
            oFill = CreateButtonHoverGradient();
        }
        else {
            oFill = new AscCommonExcel.Fill();//TODO: Take background from styles when it will be implemented
            if(nType & STATE_FLAG_SELECTED) {
                oFill.fromColor(new AscCommonExcel.RgbColor(0xBDD7EE));
            }
            else {
                oFill.fromColor(new AscCommonExcel.RgbColor(nColor));
            }
        }
        return oFill;
    };
    CSlicer.prototype.getBorder = function(nType) {
        var r = 91, g = 155, b = 213;
        if(nType !== STYLE_TYPE.HEADER && nType !== STYLE_TYPE.WHOLE) {
            r = 204;
            g = 204;
            b = 204;
        }
        var oBorder = new AscCommonExcel.Border(null);
        if(nType !== STYLE_TYPE.HEADER) {
            oBorder.l = new AscCommonExcel.BorderProp();
            oBorder.l.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.l.c = AscCommonExcel.createRgbColor(r, g, b);
            oBorder.t = new AscCommonExcel.BorderProp();
            oBorder.t.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.t.c = AscCommonExcel.createRgbColor(r, g, b);
            oBorder.r = new AscCommonExcel.BorderProp();
            oBorder.r.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.r.c = AscCommonExcel.createRgbColor(r, g, b);
        }
        oBorder.b = new AscCommonExcel.BorderProp();
        oBorder.b.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.b.c = AscCommonExcel.createRgbColor(r, g, b);
        return oBorder;
    };
    CSlicer.prototype.recalculateBrush = function() {
        var oFill = this.getFill(STYLE_TYPE.WHOLE);
        var oParents = this.getParentObjects();
        this.brush = AscCommonExcel.convertFillToUnifill(oFill);
        this.brush.calculate(oParents.theme, oParents.slide, oParents.layout, oParents.master, {R:0, G:0, B:0, A: 255});
    };
    CSlicer.prototype.recalculatePen = function() {
        this.pen = null;
    };
    CSlicer.prototype.recalculateGeometry = function() {
        this.calcGeometry = AscFormat.CreateGeometry("rect");
        this.calcGeometry.Recalculate(this.extX, this.extY);
    };
    CSlicer.prototype.canRotate = function() {
        return false;
    };
    CSlicer.prototype.recalculate = function () {
        AscFormat.ExecuteNoHistory(function () {
            AscFormat.CShape.prototype.recalculate.call(this);
            if(this.recalcInfo.recalculateHeader) {
                this.recalculateHeader();
                this.recalcInfo.recalculateHeader = false;
            }
            if(this.recalcInfo.recalculateButtons) {
                this.recalculateButtons();
                this.recalcInfo.recalculateButtons = false;
            }

        }, this, []);
    };
    CSlicer.prototype.recalculateHeader = function() {
        var bShowHeader = this.getShowCaption();
        var sCaption = this.getCaption();
        if(!bShowHeader || sCaption.length < 1) {
            this.header = null;
            return;
        }
        if(!this.header) {
            this.header = new CHeader(this);
        }
        this.header.setRecalculateInfo();
        this.header.recalculate();
    };
    CSlicer.prototype.recalculateButtons = function() {
        if(!this.buttonsContainer) {
            this.buttonsContainer = new CButtonsContainer(this);
        }
        this.buttonsContainer.clear();
        var nValuesCount = this.getValuesCount();
        for(var nValue = 0; nValue < nValuesCount; ++nValue) {
            this.buttonsContainer.addButton(new CButton(this.buttonsContainer));
        }
        var nWidth = this.extX;
        var nHeight = this.extY;
        this.buttonsContainer.x = LEFT_PADDING;
        this.buttonsContainer.y = TOP_PADDING;
        if(this.header) {
            nHeight -= this.header.extY;
            this.buttonsContainer.y += this.header.extY;
        }
        this.buttonsContainer.extX = Math.max(nWidth - LEFT_PADDING - RIGHT_PADDING, 0);
        this.buttonsContainer.extY = Math.max(nHeight - TOP_PADDING - BOTTOM_PADDING, 0);
        this.buttonsContainer.recalculate();
    };
    CSlicer.prototype.getColumnsCount = function() {
        return this.data.getColumnsCount();
    };
    CSlicer.prototype.getCaption = function() {
        return this.data.getCaption();
    };
    CSlicer.prototype.getButtonHeight = function() {
        return this.data.getButtonHeight();
    };
    CSlicer.prototype.getShowCaption = function() {
        return this.data.getShowCaption();
    };
    CSlicer.prototype.getTxStyles = function (nType) {
        var oFont = this.getFont(nType);
        var oTextPr =  this.txStyles.Default.TextPr;
        oTextPr.InitDefault();
        oTextPr.FillFromExcelFont(oFont);
        oTextPr.FillFromExcelFont(oFont);
        var oParaPr = this.txStyles.Default.ParaPr;
        oParaPr.SetSpacing(1, undefined, 0, 0, undefined, undefined);
        return {styles: this.txStyles, lastId: undefined};
    };
    CSlicer.prototype.isMultiSelect = function() {
        if(this.header) {
            return this.header.isMultiSelect();
        }
        return false;
    };
    CSlicer.prototype.internalDraw = function(graphics, transform, transformText, pageIndex) {
        var r = graphics.updatedRect;
        if(r) {
            if(!this.bounds.isIntersect(r.x, r.y, r.x + r.w, r.y + r.h)) {
                return;
            }
        }
        AscFormat.CShape.prototype.draw.call(this, graphics, transform, transformText, pageIndex);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }

        var oBorder = this.getBorder(STYLE_TYPE.WHOLE);
        if(oBorder) {
            var oTransform = transform || this.transform;
            graphics.SaveGrState();
            graphics.transform3(oTransform);
            var oSide;
            oSide = oBorder.l;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {
                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawVerLine(1, 0, 0, this.extY, 0);
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawHorLine(1, 0, 0, this.extX, 0);
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawVerLine(1, this.extX, 0, this.extY, 0);
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(1, this.extY, 0, this.extX, 0);
            }
            graphics.RestoreGrState();
        }
        if(this.header) {
            this.header.draw(graphics, transform, transformText, pageIndex);
        }
        if(this.buttonsContainer) {
            this.buttonsContainer.draw(graphics, transform, transformText, pageIndex);
        }
    };
    CSlicer.prototype.draw = function (graphics, transform, transformText, pageIndex) {
        AscFormat.ExecuteNoHistory(this.internalDraw, this, [graphics, transform, transformText, pageIndex]);

    };
    CSlicer.prototype.handleUpdateExtents = function () {
        this.recalcInfo.recalculateHeader = true;
        this.recalcInfo.recalculateButtons = true;
        AscFormat.CShape.prototype.handleUpdateExtents.call(this);
    };
    CSlicer.prototype.isEventListener = function (child) {
        return this.eventListener === child;
    };
    CSlicer.prototype.setEventListener = function (child) {
        this.eventListener = child;
    };
    CSlicer.prototype.handleClearButtonClick = function () {
        if(!this.buttonsContainer) {
            return;
        }
        this.buttonsContainer.selectAllButtons();
        this.onViewUpdate();
    };
    CSlicer.prototype.onDataUpdate = function() {
        this.data.clear();
        this.removeAllButtonsTmpState();
        this.handleUpdateExtents();
        this.recalculate();
        this.onUpdate();
    };
    CSlicer.prototype.removeAllButtonsTmpState = function() {
        if(this.buttonsContainer) {
            this.buttonsContainer.removeAllButtonsTmpState();
        }
    };
    CSlicer.prototype.onViewUpdate = function() {
        this.data.onViewUpdate();
    };
    CSlicer.prototype.onMouseMove = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            if(!e.IsLocked) {
                return this.onMouseUp(e, x, y);
            }
            bRet =  this.eventListener.onMouseMove(e, x, y);

            if(bRet) {
                this.onUpdate();
            }
            return true;
        }
        if(this.header) {
            bRet = bRet || this.header.onMouseMove(e, x, y);
        }
        if(this.buttonsContainer) {
            bRet = bRet || this.buttonsContainer.onMouseMove(e, x, y);
        }
        if(bRet) {
            this.onUpdate();
        }
        if(this.hitInInnerArea(x, y)) {
            bRet = true;
        }
        return bRet;
    };
    CSlicer.prototype.onMouseDown = function (e, x, y) {
        var bRet = false, bRes;
        e.IsLocked = true;
        if(this.eventListener) {
            this.eventListener.onMouseUp(e, x, y);
        }
        if(this.header) {
            bRes = this.header.onMouseDown(e, x, y);
            bRet = bRet || bRes;
        }
        if(this.buttonsContainer) {
            bRes = this.buttonsContainer.onMouseDown(e, x, y);
            bRet = bRet || bRes;
        }
        if(bRet) {
            this.onUpdate();
        }
        return bRet;
    };
    CSlicer.prototype.onMouseUp = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            bRet = this.eventListener.onMouseUp(e, x, y);
            this.setEventListener(null);
            this.onUpdate();
            this.onViewUpdate();
            return bRet;
        }
        if(bRet) {
            this.onUpdate();
        }
        return bRet;
    };
    CSlicer.prototype.getValues = function () {
        return this.data.getValues();
    };
    CSlicer.prototype.getButtonState = function (nIndex) {
        return this.data.getButtonState(nIndex);
    };
    CSlicer.prototype.getValuesCount = function () {
        return this.data.getValuesCount();
    };
    CSlicer.prototype.getString = function (nIndex) {
        return this.data.getString(nIndex);
    };
    CSlicer.prototype.isAllValuesSelected = function () {
        return this.data.isAllValuesSelected();
    };
    CSlicer.prototype.getInvFullTransformMatrix = function () {
        return this.invertTransform;
    };
    CSlicer.prototype.onWheel = function (deltaX, deltaY) {
        return this.buttonsContainer.onWheel(deltaX, deltaY);
    };
    CSlicer.prototype.onSlicerUpdate = function (sName) {
        if(this.name === sName) {
            this.onDataUpdate();
        }
    };
    CSlicer.prototype.onSlicerDelete = function (sName) {
         var bRet = false;
        if(this.name === sName) {
            if(this.drawingBase) {
                this.deleteDrawingBase();
                bRet = true;
            }
            else {
                if(this.group) {
                    this.group.removeFromSpTree(this.Id);
                    bRet = true;
                }
            }
        }
        if(bRet) {
            this.onUpdate();
            var oController = this.getDrawingObjectsController();
            if(oController) {
                this.deselect(oController);
            }
        }
        return bRet;
    };

    function CHeader(slicer) {
        AscFormat.CShape.call(this);
        this.slicer = slicer;
        this.worksheet = slicer.worksheet;
        this.txBody = null;
        this.buttons = [];
        this.buttons.push(new CInterfaceButton(this));
        this.buttons.push(new CInterfaceButton(this));
        this.buttons[1].removeTmpState();
        this.setBDeleted(false);
        this.setTransformParams(0, 0, 0, 0, 0, false, false);
        this.createTextBody();
        this.bodyPr = new AscFormat.CBodyPr();
        this.bodyPr.setDefault();
        this.bodyPr.anchor = 1;//vertical align ctr
        this.bodyPr.lIns = HEADER_LEFT_PADDING;
        this.bodyPr.rIns = HEADER_RIGHT_PADDING;
        this.bodyPr.tIns = HEADER_TOP_PADDING;
        this.bodyPr.bIns = HEADER_BOTTOM_PADDING;
        this.bodyPr.horzOverflow = AscFormat.nOTClip;
        this.bodyPr.vertOverflow = AscFormat.nOTClip;

        this.eventListener = null;
        this.startButton = null;
    }
    CHeader.prototype = Object.create(AscFormat.CShape.prototype);
    CHeader.prototype.getString = function() {
        return this.slicer.getCaption();
    };
    CHeader.prototype.Get_Styles = function() {
        return this.slicer.getTxStyles(STYLE_TYPE.HEADER);
    };
    CHeader.prototype.getParentObjects = function() {
        return this.slicer.getParentObjects();
    };
    CHeader.prototype.isMultiSelect = function() {
        return this.buttons[0].isSelected();
    };
    CHeader.prototype.recalculateBrush = function () {
        var oFill = this.slicer.getFill(STYLE_TYPE.HEADER);
        var oParents = this.slicer.getParentObjects();
        this.brush = AscCommonExcel.convertFillToUnifill(oFill);
        this.brush.calculate(oParents.theme, oParents.slide, oParents.layout, oParents.master, {R:0, G:0, B:0, A: 255});
    };
    CHeader.prototype.recalculatePen = function () {
        this.pen = null;
    };
    CHeader.prototype.recalculateContent = function () {
        if(this.bRecalcContent) {
            return;
        }
        this.setTransformParams(0, 0, this.slicer.extX, HEADER_BUTTON_WIDTH, 0, false, false);
        this.recalculateGeometry();
        this.recalculateTransform();
        this.txBody.recalculateOneString(this.getString());
        var dHeight = this.contentHeight + HEADER_TOP_PADDING + HEADER_BOTTOM_PADDING;
        dHeight = Math.max(dHeight, HEADER_BUTTON_WIDTH + 1);
        this.setTransformParams(0, 0, this.slicer.extX, dHeight, 0, false, false);
        this.recalcInfo.recalculateContent = false;
        this.bRecalcContent = true;
        this.recalculate();
        this.recalculateButtons();
        this.bRecalcContent = false;
    };
    CHeader.prototype.getBodyPr = function () {
        return this.bodyPr;
    };
    CHeader.prototype.recalculateGeometry = function() {
        this.calcGeometry = AscFormat.CreateGeometry("rect");
        this.calcGeometry.Recalculate(this.extX, this.extY);
    };
    CHeader.prototype.recalculateButtons = function() {
        var oButton = this.buttons[1];
        var x, y;
        x = this.extX - RIGHT_PADDING - HEADER_BUTTON_WIDTH;
        y = this.extY / 2 - HEADER_BUTTON_WIDTH / 2;
        oButton.setTransformParams(x, y, HEADER_BUTTON_WIDTH, HEADER_BUTTON_WIDTH, 0, false, false);
        oButton.recalculate();
        oButton = this.buttons[0];
        x = this.extX - 2*RIGHT_PADDING - 2*HEADER_BUTTON_WIDTH;
        oButton.setTransformParams(x, y, HEADER_BUTTON_WIDTH, HEADER_BUTTON_WIDTH, 0, false, false);
        oButton.recalculate();
    };
    CHeader.prototype.draw = function (graphics) {
        var oMT = AscCommon.global_MatrixTransformer;
        var oTransform = this.transform.CreateDublicate();
        oMT.MultiplyAppend(oTransform, this.slicer.transform);
        var oTransformText = this.transformText.CreateDublicate();
        oMT.MultiplyAppend(oTransformText, this.slicer.transform);
        AscFormat.CShape.prototype.draw.call(this, graphics, oTransform, oTransformText);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }
        this.buttons[0].draw(graphics);
        this.buttons[1].draw(graphics);
        var oBorder = this.slicer.getBorder(STYLE_TYPE.HEADER);
        if(oBorder) {
            graphics.SaveGrState();
            graphics.transform3(oTransform);
            var oSide, bDrawn = false;
            oSide = oBorder.l;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawVerLine(1, 0, 0, this.extY, 0);
                bDrawn = true;
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(1, 0, 0, this.extX, 0);
                bDrawn = true;
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                      graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawVerLine(1, this.extX, 0, this.extY, 0);
                bDrawn = true;
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                if(bDrawn) {
                    graphics.drawHorLine(1, this.extY, 0, this.extX, 0);
                }
                else {
                    graphics.drawHorLine(1, this.extY, LEFT_PADDING, this.slicer.extX - RIGHT_PADDING, 0);
                }
            }
            graphics.drawVerLine();
            graphics.RestoreGrState();
        }
    };
    CHeader.prototype.getTxStyles = function (nType) {
        return this.slicer.getTxStyles(nType);
    };
    CHeader.prototype.getBorder = function (nType) {
        var oBorder = null;
        return oBorder;
        if(nType & STATE_FLAG_SELECTED || nType & STATE_FLAG_HOVERED) {
            var r = 204, g = 204, b = 204;
            oBorder = new AscCommonExcel.Border(null);
            oBorder.l = new AscCommonExcel.BorderProp();
            oBorder.l.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.l.c = AscCommonExcel.createRgbColor(r, g, b);
            oBorder.t = new AscCommonExcel.BorderProp();
            oBorder.t.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.t.c = AscCommonExcel.createRgbColor(r, g, b);
            oBorder.r = new AscCommonExcel.BorderProp();
            oBorder.r.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.r.c = AscCommonExcel.createRgbColor(r, g, b);
            oBorder.b = new AscCommonExcel.BorderProp();
            oBorder.b.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.b.c = AscCommonExcel.createRgbColor(r, g, b);
        }
        return oBorder;
    };
    CHeader.prototype.getFill = function (nType) {
        var nColor = HEADER_BUTTON_COLORS[nType];
        var oFill = null;
        if(nColor !== null) {
            oFill = new AscCommonExcel.Fill();
            oFill.fromColor(new AscCommonExcel.RgbColor(nColor));
        }
        return oFill;
        if(nType === STYLE_TYPE.WHOLE || nType === STYLE_TYPE.HEADER) {
            return null;
        }
        var oFill;
        if(nType & STATE_FLAG_HOVERED) {
            if(nType & STATE_FLAG_SELECTED) {
                oFill = new AscCommonExcel.Fill();
                oFill.fromColor(AscCommonExcel.createRgbColor(248, 225, 98));
            }
            else {
                oFill = CreateButtonHoverGradient();
            }
        }
        else {
            if(nType & STATE_FLAG_SELECTED) {
                oFill = CreateButtonHoverGradient();
            }
            else {
                oFill = null;
            }
        }
        return oFill;
    };
    CHeader.prototype.getIcon = function(nIndex, nType) {
        var sRet;
        if(nIndex === 0) {
            if(nType & STATE_FLAG_SELECTED) {
                sRet = ICON_MULTISELECT_INVERTED;
            }
            else {
                sRet = ICON_MULTISELECT; 
            }
        }
        else {
            if(nType & STATE_FLAG_WHOLE) {
                sRet = ICON_CLEAR_FILTER_DISABLED;
            }
            else {
                sRet = ICON_CLEAR_FILTER;
            }
        }
        return sRet;
    };
    CHeader.prototype.getFullTransformMatrix = function () {
        var oMT = AscCommon.global_MatrixTransformer;
        var oTransform = oMT.CreateDublicateM(this.transform);
        oMT.MultiplyAppend(oTransform, this.slicer.transform);
        return oTransform;
    };
    CHeader.prototype.getInvFullTransformMatrix = function () {
        return this.slicer.invertTransform;
    };
    CHeader.prototype.isEventListener = function (child) {
        return this.eventListener === child;
    };
    CHeader.prototype.onMouseMove = function (e, x, y) {
        if(this.eventListener) {
            return this.eventListener.onMouseMove(e, x, y);
        }
        var bRet = false;
        bRet = bRet || this.buttons[0].onMouseMove(e, x, y);
        bRet = bRet || this.buttons[1].onMouseMove(e, x, y);
        return bRet;
    };
    CHeader.prototype.onMouseDown = function (e, x, y) {
        var bRet = false;
        bRet = bRet || this.buttons[0].onMouseDown(e, x, y);
        bRet = bRet || this.buttons[1].onMouseDown(e, x, y);
        return bRet;
    };
    CHeader.prototype.onMouseUp = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            bRet = this.eventListener.onMouseUp(e, x, y);
            this.eventListener = null;
            return bRet;
        }
        bRet = bRet || this.buttons[0].onMouseUp(e, x, y);
        bRet = bRet || this.buttons[1].onMouseUp(e, x, y);
        this.setEventListener(null);
        return bRet;
    };
    CHeader.prototype.getButtonIndex = function (oButton) {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            if(this.buttons[nButton] === oButton) {
                return nButton;
            }
        }
        return -1;
    };
    CHeader.prototype.setEventListener = function (child) {
        this.eventListener = child;
        if(child) {
            this.slicer.setEventListener(this);
        }
        else {
            if(this.slicer.isEventListener(this)) {
                this.slicer.setEventListener(null);
            }
        }
    };
    CHeader.prototype.handleMouseUp = function (nIndex) {
        var oButton = this.buttons[nIndex];
        if(!oButton) {
            return;
        }
        if(nIndex === 1) {
            this.slicer.handleClearButtonClick();
        }
    };
    CHeader.prototype.handleMouseDown = function (nIndex) {
        var oButton = this.buttons[nIndex];
        if(!oButton) {
            return;
        }
        if(nIndex === 0) {
            oButton.setInvertSelectTmpState();
            this.slicer.onUpdate();
        }
    };
    CHeader.prototype.isButtonDisabled = function (nIndex) {
        if(nIndex === 1) {
            return this.slicer.isAllValuesSelected();
        }
        else {
            return false;
        }
    };
    CHeader.prototype.getButtonState = function (nIndex) {
        var oButton = this.buttons[nIndex];
        var nRet = STYLE_TYPE.WHOLE;
        if(!oButton) {
            return nRet
        }
        if(nIndex === 0) {
            if(oButton.tmpState !== null) {
                nRet = oButton.tmpState;
            }
            else {
                nRet = STYLE_TYPE.WHOLE;
            }
        }
        else {
            if(this.slicer.isAllValuesSelected()) {
                nRet = STYLE_TYPE.WHOLE;
            }
            else {
                nRet = STYLE_TYPE.UNSELECTED_DATA;
            }
        }
        return nRet;
    };
    CHeader.prototype.getParentObjects = function () {
        return this.slicer.getParentObjects();
    };
    CHeader.prototype.getScrollOffsetX = function () {
        return 0;
    };
    CHeader.prototype.getScrollOffsetY = function () {
        return 0;
    };

    function CButtonBase(parent) {
        AscFormat.CShape.call(this);
        this.parent = parent;
        this.tmpState = null;
        this.worksheet = parent.worksheet;
        this.setBDeleted(false);
        AscFormat.CheckSpPrXfrm3(this);
        this.isHovered = false;
    }
    CButtonBase.prototype = Object.create(AscFormat.CShape.prototype);
    CButtonBase.prototype.getTxBodyType = function () {
        var nRet = null;
        return nRet;
    };
    CButtonBase.prototype.getString = function() {
        return "";
    };
    CButtonBase.prototype.Get_Styles = function() {
        return this.parent.getTxStyles(this.getTxBodyType());
    };
    CButtonBase.prototype.getBodyPr = function () {
        return this.bodyPr;
    };
    CButtonBase.prototype.getFullTransform = function() {
        var oMT = AscCommon.global_MatrixTransformer;
        var oTransform = oMT.CreateDublicateM(this.localTransform);

        var oScrollMatrix = new AscCommon.CMatrix();
        oScrollMatrix.tx = this.parent.getScrollOffsetX();
        oScrollMatrix.ty = this.parent.getScrollOffsetY();
        oMT.MultiplyAppend(oTransform, oScrollMatrix);
        var oParentTransform = this.parent.getFullTransformMatrix();
        oParentTransform && oMT.MultiplyAppend(oTransform, oParentTransform);
        return oTransform;
    };
    CButtonBase.prototype.getFullTextTransform = function() {
        var oMT = AscCommon.global_MatrixTransformer;
        var oParentTransform = this.parent.getFullTransformMatrix();
        var oTransformText = oMT.CreateDublicateM(this.localTransformText);
        var oScrollMatrix = new AscCommon.CMatrix();
        oScrollMatrix.tx = this.parent.getScrollOffsetX();
        oScrollMatrix.ty = this.parent.getScrollOffsetY();
        oMT.MultiplyAppend(oTransformText, oScrollMatrix);
        oParentTransform && oMT.MultiplyAppend(oTransformText, oParentTransform);
        return oTransformText;
    };
    CButtonBase.prototype.getInvFullTransformMatrix = function() {
        var oMT = AscCommon.global_MatrixTransformer;
        return oMT.Invert(this.getFullTransform());
    };
    CButtonBase.prototype.getOwnState = function() {
        return this.parent.getButtonState(this.parent.getButtonIndex(this));
    };
    CButtonBase.prototype.getState = function() {
        var nState = 0;
        if(this.tmpState !== null) {
            nState = this.tmpState;
        }
        else {
            nState = this.getOwnState();
        }
        if(this.isHovered) {
            nState |= STATE_FLAG_HOVERED;
        }
        else {
            nState &= (~STATE_FLAG_HOVERED);
        }
        return nState;
    };
    CButtonBase.prototype.setUnselectTmpState = function() {
        this.setTmpState(this.getOwnState() & (~STATE_FLAG_SELECTED));
    };
    CButtonBase.prototype.setSelectTmpState = function() {
        this.setTmpState(this.getOwnState() | STATE_FLAG_SELECTED);
    };
    CButtonBase.prototype.setHoverState = function() {
        this.isHovered = true;
    };
    CButtonBase.prototype.setNotHoverState = function() {
        this.isHovered = false;
    };
    CButtonBase.prototype.setInvertSelectTmpState = function() {
        var nOwnState = this.getOwnState();
        if(nOwnState & STATE_FLAG_SELECTED) {
            this.setTmpState(nOwnState & (~STATE_FLAG_SELECTED));
        }
        else {
            this.setTmpState(nOwnState | STATE_FLAG_SELECTED);
        }
    };
    CButtonBase.prototype.setTmpState = function(state) {
        this.tmpState = state;
    };
    CButtonBase.prototype.removeTmpState = function() {
        this.setTmpState(null);
    };
    CButtonBase.prototype.isSelected = function() {
        return (this.getState() & STATE_FLAG_SELECTED) !== 0;
    };
    CButtonBase.prototype.recalculate = function() {
        AscFormat.CShape.prototype.recalculate.call(this);
    };
    CButtonBase.prototype.recalculateBrush = function () {
        //Empty procedure. Set of brushes for all states will be recalculated in CSlicer
    };
    CButtonBase.prototype.recalculatePen = function () {
        this.pen = null;
    };
    CButtonBase.prototype.recalculateContent = function () {
    };
    CButtonBase.prototype.recalculateGeometry = function() {
        this.calcGeometry = AscFormat.CreateGeometry("rect");
        this.calcGeometry.Recalculate(this.extX, this.extY);
    };
    CButtonBase.prototype.recalculateTransform = function() {
        AscFormat.CShape.prototype.recalculateTransform.call(this);
        var oMT = AscCommon.global_MatrixTransformer;
        this.transform = this.getFullTransform();
        this.invertTransform = oMT.Invert(this.transform);
    };
    CButtonBase.prototype.recalculateTransformText = function() {
        AscFormat.CShape.prototype.recalculateTransformText.call(this);
        var oMT = AscCommon.global_MatrixTransformer;
        this.transformText = this.getFullTextTransform();
        this.invertTransformText = oMT.Invert(this.transformText);
    };
    CButtonBase.prototype.recalculateBounds = function() {
        this.bounds.x = this.transform.tx;
        this.bounds.y = this.transform.ty;
        this.bounds.l = this.bounds.x;
        this.bounds.t = this.bounds.y;
        this.bounds.r = this.bounds.x + this.extX;
        this.bounds.b = this.bounds.y + this.extY;
        this.bounds.w = this.bounds.r - this.bounds.l;
        this.bounds.h = this.bounds.b - this.bounds.t;
    };
    CButtonBase.prototype.draw = function (graphics) {
        var parents = this.getParentObjects();
        this.brush = AscCommonExcel.convertFillToUnifill(this.parent.getFill(this.getState()));
        this.brush.calculate(parents.theme, parents.slide, parents.layout, parents.master, {R: 0, G: 0, B: 0, A: 255});
        this.recalculateTransform();
        this.recalculateTransformText();
        if(!graphics.IsSlideBoundsCheckerType) {
            this.recalculateBounds();
        }
        AscFormat.CShape.prototype.draw.call(this, graphics);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }
        var oBorder = this.parent.getBorder(this.getState());
        if(oBorder) {
            graphics.SaveGrState();
            graphics.transform3(this.transform);
            var oSide;
            oSide = oBorder.l;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {
                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawVerLine(0, 0, 0, this.extY, 0);
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(0, 0, 0, this.extX, 0);
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawVerLine(2, this.extX, 0, this.extY, 0);
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(2, this.extY, 0, this.extX, 0);
            }
            graphics.RestoreGrState();
        }
    };
    CButtonBase.prototype.hit = function(x, y) {
        var oInv = this.invertTransform;
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        return tx >= 0 && tx <= this.extX && ty >= 0 && ty <= this.extY;
    };
    CButtonBase.prototype.onMouseMove = function (e, x, y) {
        if(e.IsLocked) {
            return false;
        }
        var bHover = this.hit(x, y);
        var bRet = bHover !== this.isHovered;
        if(bHover) {
            this.setHoverState();
        }
        else {
            this.setNotHoverState();
        }
        return bRet;
    };
    CButtonBase.prototype.onMouseDown = function (e, x, y) {
        if(this.hit(x, y)) {
            this.parent.setEventListener(this);
            return true;
        }
        return false;
    };
    CButtonBase.prototype.onMouseUp = function (e, x, y) {
        this.parent.setEventListener(null);
        return false;
    };
    
    function CButton(parent) {
        CButtonBase.call(this, parent);
        this.textBoxes = {};
            for(var key in STYLE_TYPE) {
                if(STYLE_TYPE.hasOwnProperty(key)) {
                    this.createTextBody();
                    this.textBoxes[STYLE_TYPE[key]] = new CTextBox(this.txBody, new AscCommon.CMatrix());
                }
            }
            this.bodyPr = new AscFormat.CBodyPr();
            this.bodyPr.setDefault();
            this.bodyPr.anchor = 1;//vertical align ctr
            this.bodyPr.lIns = LEFT_PADDING;
            this.bodyPr.rIns = RIGHT_PADDING;
            this.bodyPr.tIns = 0;
            this.bodyPr.bIns = 0;
            this.bodyPr.bIns = 0;
            this.bodyPr.horzOverflow = AscFormat.nOTClip;
            this.bodyPr.vertOverflow = AscFormat.nOTClip;
        }
    CButton.prototype = Object.create(CButtonBase.prototype);
    CButton.prototype.getTxBodyType = function () {
        var nRet = null;
        for(var key in this.textBoxes) {
            if(this.textBoxes.hasOwnProperty(key)) {
                if(this.textBoxes[key].txBody === this.txBody) {
                    nRet = key;
                    break;
                }
            }
        }
        return nRet;
    };
    CButton.prototype.getString = function() {
        return this.parent.getString(this.parent.getButtonIndex(this));
    };
    CButton.prototype.recalculateContent = function () {
        var sText = this.getString();
        for(var key in this.textBoxes) {
            if(this.textBoxes.hasOwnProperty(key)) {
                this.txBody = this.textBoxes[key].txBody;
                this.txBody.recalculateOneString(sText);
            }
        }
    };

    function CInterfaceButton(parent) {
        CButtonBase.call(this, parent);
        this.setTmpState(STYLE_TYPE.UNSELECTED_DATA);
    }
    CInterfaceButton.prototype = Object.create(CButtonBase.prototype);
    CInterfaceButton.prototype.isDisabled = function () {
        return this.parent.isButtonDisabled(this.parent.getButtonIndex(this));
    };
    CInterfaceButton.prototype.hit = function (x, y) {
        if(this.isDisabled()) {
            return false;
        }
        return CButtonBase.prototype.hit.call(this, x, y);
    };
    CInterfaceButton.prototype.onMouseDown = function (e, x, y) {
        if(this.isDisabled()) {
            return false;
        }
        var bRet = CButtonBase.prototype.onMouseDown.call(this, e, x, y);
        if(bRet) {
            this.parent.handleMouseDown(this.parent.getButtonIndex(this));
        }
        return bRet;
    };
    CInterfaceButton.prototype.onMouseMove = function (e, x, y) {
        if(this.isDisabled()) {
            return false;
        }
        return CButtonBase.prototype.onMouseMove.call(this, e, x, y);
    };
    CInterfaceButton.prototype.onMouseUp = function (e, x, y) {
        var bEventListener = this.parent.isEventListener(this);
        var bRet = CButtonBase.prototype.onMouseUp.call(this, e, x, y);
        if(bEventListener) {
            this.parent.handleMouseUp(this.parent.getButtonIndex(this));
        }
        return bRet;
    };
    CInterfaceButton.prototype.draw = function(graphics) {
        CButtonBase.prototype.draw.call(this, graphics);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }
        var sIcon = this.parent.getIcon(this.parent.getButtonIndex(this), this.getState());
        if(null !== sIcon) {
            graphics.SaveGrState();
            graphics.transform3(this.transform);
            graphics.drawImage(sIcon, 0, 0, this.extX, this.extY, 255, null, null);
            graphics.RestoreGrState();
        }
    };

    function CButtonsContainer(slicer) {
        this.slicer = slicer;
        this.worksheet = slicer.worksheet;
        this.buttons = [];
        this.x = 0;
        this.y = 0;
        this.extX = 0;
        this.extY = 0;
        this.contentW = 0;
        this.contentH = 0;
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.scroll = new CScroll(this);

        this.eventListener = null;
        this.startX = 0;
        this.startY = 0;
        this.startButton = -1;
    }
    CButtonsContainer.prototype.getParentObjects = function() {
        return this.slicer.getParentObjects();
    };
    CButtonsContainer.prototype.clear = function() {
        this.buttons.length = 0;
    };
    CButtonsContainer.prototype.addButton = function (oButton) {
        this.buttons.push(oButton);
    };
    CButtonsContainer.prototype.getButtonIndex = function (oButton) {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            if(this.buttons[nButton] === oButton) {
                return nButton;
            }
        }
        return -1;
    };
    CButtonsContainer.prototype.getViewButtonsCount = function () {
        return this.buttons.length;
    };
    CButtonsContainer.prototype.getViewButtonState = function(nIndex) {
        var oButton = this.getButton(nIndex);
        if(!oButton) {
            return null;
        }
        return oButton.getState();
    };
    CButtonsContainer.prototype.getButton = function (nIndex) {
        if(nIndex > -1 && nIndex < this.buttons.length) {
            return this.buttons[nIndex];
        }
        return null;
    };
    CButtonsContainer.prototype.findButtonIndex = function (x, y) {
        var oInv = this.getInvFullTransformMatrix();
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        ty -= this.getScrollOffsetY();
        var nRow, nRowsCount = this.getRowsCount();
        for(nRow = 0;nRow < nRowsCount; ++nRow) {
            if(ty < this.getRowStart(nRow)) {
                break;
            }
        }
        --nRow;
        if(nRow === -1) {
            return -1
        }
        var nCol, nColsCount = this.getColumnsCount();
        for(nCol = 0; nCol < nColsCount; ++nCol) {
            if(tx < this.getColumnStart(nCol)) {
                break;
            }
        }
        --nCol;
        if(nCol === -1) {
            --nRow;
            if(nRow === -1) {
                return - 1;
            }
            nCol = nColsCount - 1
        }
        var nIndex = nRow * nColsCount;
        if(nRow < nRowsCount - 1) {
            nIndex += nCol;
        }
        else {
            nIndex += Math.min(nCol, this.buttons.length - (nRowsCount - 1)*nColsCount);
        }
        return nIndex;

    };
    CButtonsContainer.prototype.getTxStyles = function (nType) {
        return this.slicer.getTxStyles(nType);
    };
    CButtonsContainer.prototype.getBorder = function (nType) {
        return this.slicer.getBorder(nType);
    };
    CButtonsContainer.prototype.getFill = function (nType) {
        return this.slicer.getFill(nType);
    };
    CButtonsContainer.prototype.getButtonHeight = function () {
        return this.slicer.getButtonHeight();
    };
    CButtonsContainer.prototype.getButtonWidth = function () {
        var nColumnCount = this.getColumnsCount();
        var nSpaceCount = nColumnCount - 1;
        var dTotalHeight = this.getTotalHeight();
        var dButtonWidth;
        if(dTotalHeight <= this.extY) {
            dButtonWidth = Math.max(0, this.extX - nSpaceCount * SPACE_BETWEEN) / nColumnCount;
        }
        else {
            dButtonWidth = Math.max(0, this.extX - this.scroll.getWidth() - SPACE_BETWEEN - nSpaceCount * SPACE_BETWEEN) / nColumnCount;
        }
        return dButtonWidth;
    };
    CButtonsContainer.prototype.getColumnsCount = function () {
        return this.slicer.getColumnsCount();
    };
    CButtonsContainer.prototype.getRowsCount = function () {
        return ((this.buttons.length - 1) / this.getColumnsCount() >> 0) + 1;
    };
    CButtonsContainer.prototype.getRowsInFrame = function () {
        return (this.extY + SPACE_BETWEEN) / (this.getButtonHeight() + SPACE_BETWEEN)  >> 0;
    };
    CButtonsContainer.prototype.getScrolledRows = function () {
        return this.getRowsCount() - this.getRowsInFrame();
    };
    CButtonsContainer.prototype.getTotalHeight = function () {
        var nRowsCount = this.getRowsCount();
        return  this.getButtonHeight() * nRowsCount + SPACE_BETWEEN * (nRowsCount - 1);
    };
    CButtonsContainer.prototype.getColumnStart = function (nColumn) {
        return this.x + (this.getButtonWidth() + SPACE_BETWEEN) * nColumn;
    };
    CButtonsContainer.prototype.getRowStart = function (nRow) {
        return this.y + (this.getButtonHeight() + SPACE_BETWEEN) * nRow;
    };
    CButtonsContainer.prototype.checkScrollTop = function() {
        this.scrollTop = Math.max(0, Math.min(this.scrollTop, this.getScrolledRows()));
    };
    CButtonsContainer.prototype.recalculate = function() {
        var nColumnCount = this.getColumnsCount();
        var dButtonWidth, dButtonHeight;
        dButtonHeight = this.getButtonHeight();
        dButtonWidth = this.getButtonWidth();
        this.checkScrollTop();
        var nColumn, nRow, nButtonIndex, oButton, x ,y;
        for(nButtonIndex = 0; nButtonIndex < this.buttons.length; ++nButtonIndex) {
            nColumn = nButtonIndex % nColumnCount;
            nRow = nButtonIndex / nColumnCount >> 0;
            oButton = this.buttons[nButtonIndex];
            x = this.getColumnStart(nColumn);
            y = this.getRowStart(nRow);
            oButton.setTransformParams(x, y, dButtonWidth, dButtonHeight, 0, false, false);
            oButton.recalculate();
        }
        this.scroll.bVisible = this.getTotalHeight() > this.extY;
        this.scroll.recalculate();
    };
    CButtonsContainer.prototype.draw = function (graphics) {
        if(this.buttons.length > 0) {
            graphics.SaveGrState();
            graphics.transform3(this.slicer.transform);
            graphics.AddClipRect(0, this.y - SPACE_BETWEEN / 2, this.slicer.extX, this.extY + SPACE_BETWEEN / 2);
            this.checkScrollTop();
            var nColumns = this.getColumnsCount();
            var nStart = this.scrollTop * nColumns;
            var nEnd = Math.min(this.buttons.length - 1, nStart + (this.getRowsInFrame() + 1) * nColumns);
            for(var nButton = nStart; nButton <= nEnd; ++nButton) {
                this.buttons[nButton].draw(graphics);
            }
            graphics.RestoreGrState();
            this.scroll.draw(graphics);
        }
    };
    CButtonsContainer.prototype.getFullTransformMatrix = function () {
        return AscCommon.global_MatrixTransformer.CreateDublicateM(this.slicer.transform);
    };
    CButtonsContainer.prototype.getInvFullTransformMatrix = function () {
        var oM = this.getFullTransformMatrix();
        return AscCommon.global_MatrixTransformer.Invert(oM);
    };
    CButtonsContainer.prototype.hit = function (x, y) {
        var oInv = this.getInvFullTransformMatrix();
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        var bottom = Math.min(this.y + this.extY, this.getRowStart(this.getRowsCount() - 1) + this.getButtonHeight());
        return tx >= this.x && ty >= this.y &&
            tx <= this.x + this.extX && ty <= bottom;
    };
    CButtonsContainer.prototype.isEventListener = function (child) {
        return this.eventListener === child;
    };
    CButtonsContainer.prototype.onScroll = function () {
        var nOldScroll = this.scrollTop;
        this.scrollTop = Math.max(0, Math.min(this.scroll.getScrollTop(), this.getScrolledRows()));
        this.checkScrollTop();
        if(this.scrollTop !== nOldScroll) {
            this.slicer.onUpdate();
        }

    };
    CButtonsContainer.prototype.onMouseMove = function (e, x, y) {
        if(this.eventListener) {
            return this.eventListener.onMouseMove(e, x, y);
        }
        var bRet = false, nButton, nFindButton, nLast;
        if(e.IsLocked) {
            if(this.slicer.isEventListener(this)) {
                bRet = true;
                if(this.startButton > -1) {
                    var oButton = this.getButton(this.startButton);
                    if(oButton) {
                        nFindButton = this.findButtonIndex(x, y);
                        if(!this.slicer.isMultiSelect()) {
                            for(nButton = 0; nButton < this.buttons.length; ++nButton) {
                                this.buttons[nButton].setUnselectTmpState();
                            }
                            oButton.setHoverState();
                            if(nFindButton < this.startButton) {
                                for(nButton = Math.max(0, nFindButton); nButton <= this.startButton; ++nButton) {
                                    this.buttons[nButton].setSelectTmpState();
                                }
                            }
                            else {
                                nLast = Math.min(nFindButton, this.buttons.length - 1);
                                for(nButton = this.startButton; nButton <= nLast; ++nButton) {
                                    this.buttons[nButton].setSelectTmpState();
                                }
                            }
                        }
                        else {
                            this.removeAllButtonsTmpState();
                            oButton.setHoverState();
                            if(nFindButton < this.startButton) {
                                for(nButton = Math.max(0, nFindButton); nButton <= this.startButton; ++nButton) {
                                    this.buttons[nButton].setInvertSelectTmpState();
                                }
                            }
                            else {
                                nLast = Math.min(nFindButton, this.buttons.length - 1);
                                for(nButton = this.startButton; nButton <= nLast; ++nButton) {
                                    this.buttons[nButton].setInvertSelectTmpState();
                                }
                            }
                        }

                    }
                }
            }
            else {
                bRet = false;
            }
        }
        else {
            if(this.slicer.isEventListener(this)) {
                bRet = this.slicer.onMouseUp(e, x, y);
            }
            else {
                for(nButton = 0; nButton < this.buttons.length; ++nButton) {
                    bRet = bRet || this.buttons[nButton].onMouseMove(e, x, y);
                }
                bRet = bRet || this.scroll.onMouseMove(e, x, y);
            }
        }
        return bRet;
    };
    CButtonsContainer.prototype.onMouseDown = function (e, x, y) {
        if(this.eventListener) {
            this.onMouseUp(e, x, y);
            if(!this.eventListener) {
                return this.onMouseDown(e, x, y);
            }
        }
        if(this.scroll.onMouseDown(e, x, y)) {
            return true;
        }
        if(this.hit(x, y)) {
            this.slicer.setEventListener(this);
            var oInv = this.getInvFullTransformMatrix();
            this.startX = oInv.TransformPointX(x, y);
            this.startY = oInv.TransformPointY(x, y);
            this.startButton = -1;
            for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                if(this.buttons[nButton].hit(x, y)) {
                    this.startButton = nButton;
                    break;
                }
            }
            this.onMouseMove(e, x, y);
            return true;
        }
        return false;
    };
    CButtonsContainer.prototype.onMouseUp = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            bRet = this.eventListener.onMouseUp(e, x, y);
            this.setEventListener(null);
            return bRet;
        }
        if(!this.slicer.isEventListener(this)) {
            for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                bRet = bRet || this.buttons[nButton].onMouseUp(e, x, y);
            }
            bRet = bRet || this.scroll.onMouseUp(e, x, y);
            this.setEventListener(null);
        }
        return bRet;
    };
    CButtonsContainer.prototype.setEventListener = function (child) {
        this.eventListener = child;
        if(child) {
            this.slicer.setEventListener(this);
        }
        else {
            if(this.slicer.isEventListener(this)) {
                this.slicer.setEventListener(null);
                this.removeAllButtonsTmpState();
            }
        }
    };
    CButtonsContainer.prototype.getButtonState = function(nIndex) {
        return this.slicer.getButtonState(nIndex);
    };
    CButtonsContainer.prototype.getString = function(nIndex) {
        return this.slicer.getString(nIndex);
    };
    CButtonsContainer.prototype.getScrollOffsetX = function () {
        return 0;
    };
    CButtonsContainer.prototype.getScrollOffsetY = function () {
        return -(this.getRowStart(this.scrollTop) - this.y);
    };
    CButtonsContainer.prototype.onWheel = function (deltaX, deltaY) {
        return this.scroll.onWheel(deltaX, deltaY);
    };
    CButtonsContainer.prototype.selectAllButtons = function () {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            this.buttons[nButton].setSelectTmpState();
        }
    };
    CButtonsContainer.prototype.removeAllButtonsTmpState = function () {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            this.buttons[nButton].removeTmpState();
        }
    };
    CButtonsContainer.prototype.getIcon = function (nIndex, nType) {
        return null;
    };
    
    function CScrollButton(parent, type) {
        CInterfaceButton.call(this, parent);
        this.type = type;
    }
    CScrollButton.prototype = Object.create(CInterfaceButton.prototype);
    CScrollButton.prototype.draw = function (graphics) {
        CInterfaceButton.prototype.draw.call(this, graphics);
        var dInd = this.extX / 4.0;
        var dMid = this.extX / 2.0;

        var nColor = SCROLL_ARROW_COLORS[this.getState()];
        graphics.b_color1((nColor >> 16) & 0xFF, (nColor >> 8) & 0xFF, nColor & 0xFF, 0xFF);
        if(this.type === SCROLL_BUTTON_TYPE_TOP) {
            graphics.SaveGrState();
            graphics.transform3(this.transform);
            graphics._s();
            graphics._m(dInd, dMid);
            graphics._l(dMid, dInd);
            graphics._l(this.extX - dInd, dMid);
            graphics._z();
            graphics.df();
            graphics.RestoreGrState();
        }
        else if(this.type === SCROLL_BUTTON_TYPE_BOTTOM) {
            graphics.SaveGrState();
            graphics.transform3(this.transform);
            graphics._s();
            graphics._m(dInd, dMid);
            graphics._l(dMid, this.extY - dInd);
            graphics._l(this.extX - dInd, dMid);
            graphics._z();
            graphics.df();
            graphics.RestoreGrState();
        }
    };
    
    function CScroll(parent) {
        this.parent = parent;
        this.extX = 0;
        this.extY = 0;
        this.bVisible = false;
        this.buttons = [];
        this.buttons[0] = new CScrollButton(this, SCROLL_BUTTON_TYPE_TOP);
        this.buttons[1] = new CScrollButton(this, SCROLL_BUTTON_TYPE_BOTTOM);
        this.state = STYLE_TYPE.UNSELECTED_DATA;
        this.timerId = null;

        this.tmpScrollerPos = null;
        this.startScrollerPos = null;
        this.startScrollTop = null;
    }
    CScroll.prototype.getTxStyles = function () {
        return this.parent.getTxStyles();
    };
    CScroll.prototype.getFullTransformMatrix = function () {
        return this.parent.getFullTransformMatrix();
    };
    CScroll.prototype.getInvFullTransformMatrix = function () {
        return this.parent.getInvFullTransformMatrix();
    };
    CScroll.prototype.getFill = function (nType) {
        var oFill = new AscCommonExcel.Fill();
        oFill.fromColor(new AscCommonExcel.RgbColor(SCROLL_COLORS[nType]));
        return oFill;
    };
    CScroll.prototype.getBorder = function(nType) {
        var r, g, b;
        r = 0xCE;
        g = 0xCE;
        b = 0xCE;
        var oBorder = new AscCommonExcel.Border(null);
        oBorder.l = new AscCommonExcel.BorderProp();
        oBorder.l.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.l.c = AscCommonExcel.createRgbColor(r, g, b);
        oBorder.t = new AscCommonExcel.BorderProp();
        oBorder.t.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.t.c = AscCommonExcel.createRgbColor(r, g, b);
        oBorder.r = new AscCommonExcel.BorderProp();
        oBorder.r.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.r.c = AscCommonExcel.createRgbColor(r, g, b);
        oBorder.b = new AscCommonExcel.BorderProp();
        oBorder.b.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.b.c = AscCommonExcel.createRgbColor(r, g, b);
        return oBorder;
    };
    CScroll.prototype.getPosX = function () {
        return this.parent.x + this.parent.extX - this.getWidth();
    };
    CScroll.prototype.getPosY = function () {
        return this.parent.y;
    };
    CScroll.prototype.getHeight = function() {
        return this.parent.extY;
    };
    CScroll.prototype.getWidth = function() {
        return SCROLL_WIDTH;
    };
    CScroll.prototype.getButtonContainerPosX = function(nIndex) {
        return this.getPosX();
    };
    CScroll.prototype.getButtonContainerPosY = function(nIndex) {
        var dRet = 0;
        if(nIndex === 0) {
            dRet = this.getPosY();
        }
        else {
            dRet = this.getPosY() + this.getHeight() - this.getButtonContainerSize();
        }
        return dRet;
    };
    CScroll.prototype.getButtonContainerSize = function() {
        return this.getWidth();
    };
    CScroll.prototype.getButtonPosX = function (nIndex) {
        return this.getButtonContainerPosX(nIndex) + this.getButtonContainerSize() / 2 - this.getButtonSize() / 2;
    };
    CScroll.prototype.getButtonPosY = function (nIndex) {
        return this.getButtonContainerPosY(nIndex) + this.getButtonContainerSize() / 2 - this.getButtonSize() / 2;
    };
    CScroll.prototype.getButtonSize = function () {
        return this.getScrollerWidth();
    };
    CScroll.prototype.getRailPosX = function () {
        return this.getPosX() + this.getWidth() / 2 - this.getRailWidth() / 2;
    };
    CScroll.prototype.getRailPosY = function () {
        return this.getPosY() + this.getButtonContainerSize();
    };
    CScroll.prototype.getRailHeight = function() {
        return this.getHeight() - 2 * this.getButtonContainerSize();
    };
    CScroll.prototype.getRailWidth = function() {
        return SCROLLER_WIDTH;
    };
    CScroll.prototype.getScrollerX = function() {
        return this.getRailPosX() +  this.getRailWidth() / 2 - this.getScrollerWidth() / 2;
    };
    CScroll.prototype.internalGetRelScrollerY = function(nPos) {
        return (this.getRailHeight() - this.getScrollerHeight()) * (nPos/ (this.parent.getScrolledRows()));
    };
    CScroll.prototype.getRelScrollerY = function() {
        if(this.tmpScrollerPos !== null) {
            return this.tmpScrollerPos;
        }
        return this.internalGetRelScrollerY(this.parent.scrollTop);
    };
    CScroll.prototype.getMaxRelScrollerY = function() {
        return this.internalGetRelScrollerY(this.parent.getScrolledRows());
    };
    CScroll.prototype.getScrollerY = function() {
        return this.getRailPosY() + this.getRelScrollerY();
    };
    CScroll.prototype.getScrollerWidth = function() {
        return this.getRailWidth();
    };
    CScroll.prototype.getScrollTop = function() {
        return this.parent.getScrolledRows() * (this.getScrollerY() - this.getRailPosY()) / (this.getRailHeight() - this.getScrollerHeight()) + 0.5 >> 0;
    };
    CScroll.prototype.getScrollerHeight = function() {
        var dRailH = this.getRailHeight();
        var dMinRailH = dRailH / 4;
        return Math.max(dMinRailH, dRailH * (dRailH / this.parent.getTotalHeight()));
    };
    CScroll.prototype.getState = function() {
        return this.state;
    };
    CScroll.prototype.getString = function() {
        return "";
    };
    CScroll.prototype.getButtonState = function(nIndex) {
        return this.state;
    };
    CScroll.prototype.hit = function(x, y) {
        var oInv = this.parent.getInvFullTransformMatrix();
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        var l = this.getPosX();
        var t = this.getPosY();
        var r = l + this.getWidth();
        var b = t + this.getHeight();
        return tx >= l && tx <= r && ty >= t && ty <= b;
    };
    CScroll.prototype.hitInScroller = function(x, y) {
        var oInv = this.parent.getInvFullTransformMatrix();
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        var l = this.getScrollerX();
        var t = this.getScrollerY();
        var r = l + this.getScrollerWidth();
        var b = t + this.getScrollerHeight();
        return tx >= l && tx <= r && ty >= t && ty <= b;
    };
    CScroll.prototype.draw = function(graphics) {
        if(!this.bVisible) {
            return;
        }
        var x, y, extX, extY, oButton;
        oButton = this.buttons[0];
        x = this.getButtonPosX(0);
        y = this.getButtonPosY(0);
        extX = this.getButtonSize();
        extY = this.getButtonSize();
        oButton.setTransformParams(x, y, extX, extY, 0, false, false);
        oButton.recalculate();
        oButton.draw(graphics);
        oButton = this.buttons[1];
        x = this.getButtonPosX(1);
        y = this.getButtonPosY(1);
        oButton.setTransformParams(x, y, extX, extY, 0, false, false);
        oButton.recalculate();
        oButton.draw(graphics);

        x = this.getScrollerX();
        y = this.getScrollerY();
        extX = this.getScrollerWidth();
        extY = this.getScrollerHeight();
        var nColor = SCROLL_COLORS[this.getState()];

        graphics.SaveGrState();
        graphics.transform3(this.parent.getFullTransformMatrix());
        graphics.p_color(0xCE, 0xCE, 0xCE, 0xFF);
        graphics.b_color1((nColor >> 16) & 0xFF, (nColor >> 8) & 0xFF, nColor & 0xFF, 0xFF);
        graphics.p_width(0)
        graphics.rect(x, y, extX, extY);
        graphics.df();
        graphics.ds();
        //graphics.drawHorLine(1, y, x, x + extX, 0);
        //graphics.drawHorLine(1, y + extY, x, x + extX, 0);
        //graphics.drawVerLine(1, x, y, y + extY, 0);
        //graphics.drawVerLine(1, x + extX, y, y + extY, 0);
        graphics.RestoreGrState();
    };
    CScroll.prototype.onMouseMove = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            this.eventListener.onMouseMove(e, x, y);
            return true;
        }
        if(this.parent.isEventListener(this)){
            if(this.startScrollerPos === null) {
                this.startScrollerPos = y;
            }
            if(this.startScrollTop === null) {
                this.startScrollTop = this.parent.scrollTop;
            }
            var dy = y - this.startScrollerPos;
            this.setTmpScroll(dy + this.internalGetRelScrollerY(this.startScrollTop));
            return true;
        }
        bRet = bRet || this.buttons[0].onMouseMove(e, x, y);
        bRet = bRet || this.buttons[1].onMouseMove(e, x, y);

        //TODO: Use object for scroller
        var bHit = this.hitInScroller(x, y);
        var nState = this.getState();
        if(nState & STATE_FLAG_HOVERED) {
            if(!bHit) {
                this.state = nState & (~STATE_FLAG_HOVERED);
                bRet = true;
            }
        }
        else {
            if(bHit) {
                this.state = nState | STATE_FLAG_HOVERED;
                bRet = true;
            }
        }
        //-----------------------------
        return bRet;
    };
    CScroll.prototype.onMouseDown = function (e, x, y) {
        var bRet = false;
        if(this.hit(x, y)) {
            bRet = bRet || this.buttons[0].onMouseDown(e, x, y);
            bRet = bRet || this.buttons[1].onMouseDown(e, x, y);
            if(!bRet) {
                if(this.hitInScroller(x, y)) {
                    //TODO: Use object for scroller
                    this.startScrollerPos = y;
                    this.startScrollTop = this.parent.scrollTop;
                    this.state = this.state | STATE_FLAG_SELECTED;
                    this.parent.setEventListener(this);
                    this.parent.onScroll();
                    //-----------------------------
                }
                else {
                    this.parent.setEventListener(this);
                    var oInv = this.parent.getInvFullTransformMatrix();
                    var ty = oInv.TransformPointY(x, y);
                    if(ty < this.getScrollerY()) {
                        this.startScroll(-this.internalGetRelScrollerY(3));
                    }
                    else {
                        this.startScroll(this.internalGetRelScrollerY(3));
                    }
                }
                return true;
            }
        }
        return bRet;
    };
    CScroll.prototype.onMouseUp = function (e, x, y) {
        this.endScroll();
        var bRet = false;
        if(this.eventListener) {
            bRet = this.eventListener.onMouseUp(e, x, y);
            this.eventListener = null;
            return bRet;
        }
        bRet = bRet || this.buttons[0].onMouseUp(e, x, y);
        bRet = bRet || this.buttons[1].onMouseUp(e, x, y);
        this.setEventListener(null);
        return bRet;
    };
    CScroll.prototype.isButtonDisabled = function (nIndex) {
        return !this.bVisible;
    };
    CScroll.prototype.isEventListener = function (child) {
        return this.eventListener === child;
    };
    CScroll.prototype.getButtonIndex = function (oButton) {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            if(this.buttons[nButton] === oButton) {
                return nButton;
            }
        }
        return -1;
    };
    CScroll.prototype.setEventListener = function (child) {
        this.eventListener = child;
        if(child) {
            this.parent.setEventListener(this);
        }
        else {
            if(this.parent.isEventListener(this)) {
                this.parent.setEventListener(null);
            }
        }
    };
    CScroll.prototype.getParentObjects = function () {
        return this.parent.getParentObjects();
    };
    CScroll.prototype.handleMouseUp = function (nIndex) {
        var oButton  = this.buttons[nIndex];
        if(!oButton) {
            return;
        }
        oButton.setUnselectTmpState();
    };
    CScroll.prototype.handleMouseDown = function (nIndex) {
        var oButton  = this.buttons[nIndex];
        if(!oButton) {
            return;
        }
        oButton.setSelectTmpState();
        if(nIndex === 0) {
            this.startScroll(-this.internalGetRelScrollerY(1));
        }
        else {
            this.startScroll(this.internalGetRelScrollerY(1));
        }
    };
    CScroll.prototype.startScroll = function (step) {
        this.endScroll();
        var oScroll = this;
        oScroll.addScroll(step);
        this.timerId = setInterval(function () {
            oScroll.addScroll(step);
        }, SCROLL_TIMER_INTERVAL);
    };
    CScroll.prototype.addScroll = function (step) {
        this.setTmpScroll(this.getRelScrollerY() + step);
        this.parent.onScroll();
    };
    CScroll.prototype.setTmpScroll = function (val) {
        this.tmpScrollerPos = Math.max(0, Math.min(this.getMaxRelScrollerY(), val));
        this.parent.onScroll();
    };
    CScroll.prototype.clearTmpScroll = function () {
        if(this.tmpScrollerPos !== null) {
            this.tmpScrollerPos = null;
            this.parent.onScroll();
        }
    };
    CScroll.prototype.endScroll = function () {
        if(this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        this.clearTmpScroll();
        this.state = this.state & (~STATE_FLAG_SELECTED);
        this.startScrollerPos = null;
        this.startScrollTop = null;
    };
    CScroll.prototype.getScrollOffsetX = function () {
        return 0;
    };
    CScroll.prototype.getScrollOffsetY = function () {
        return 0;
    };
    CScroll.prototype.recalculate = function () {
        this.buttons[0].recalculate();
        this.buttons[1].recalculate();
    };
    CScroll.prototype.onWheel = function (deltaX, deltaY) {
        if(!this.bVisible) {
            return true;
        }
        var delta = deltaY;
        if(Math.abs(deltaX) > Math.abs(deltaY)) {
            delta = deltaX;
        }
        if(delta > 0) {
            this.addScroll(this.internalGetRelScrollerY(3));
        }
        else if(delta < 0) {
            this.addScroll(-this.internalGetRelScrollerY(3));
        }
        this.endScroll();
        return true;
    };
    CScroll.prototype.getIcon = function(nIndex, nType) {
        return null;
    };

    window["AscFormat"] = window["AscFormat"] || {};
    window["AscFormat"].CSlicer = CSlicer;
    
    window["AscCommonExcel"] = window["AscCommonExcel"] || {};
    window["AscCommonExcel"].getSlicerIconsForLoad = getSlicerIconsForLoad;
    
})();
