// node.js binding for libchewing

var ffi = require('ffi'); // requires node_ffi module

// load from .\chewing.dll
var chewing = ffi.Library('chewing', {
	// ============ chewingio.h ============
	"chewing_handle_Space": ["int", ["pointer"]],
	"chewing_handle_Esc": ["int", ["pointer"]],
	"chewing_handle_Enter": ["int", ["pointer"]],
	"chewing_handle_Del": ["int", ["pointer"]],
	"chewing_handle_Backspace": ["int", ["pointer"]],
	"chewing_handle_Tab": ["int", ["pointer"]],
	"chewing_handle_ShiftLeft": ["int", ["pointer"]],
	"chewing_handle_Left": ["int", ["pointer"]],
	"chewing_handle_ShiftRight": ["int", ["pointer"]],
	"chewing_handle_Right": ["int", ["pointer"]],
	"chewing_handle_Up": ["int", ["pointer"]],
	"chewing_handle_Home": ["int", ["pointer"]],
	"chewing_handle_End": ["int", ["pointer"]],
	"chewing_handle_PageUp": ["int", ["pointer"]],
	"chewing_handle_PageDown": ["int", ["pointer"]],
	"chewing_handle_Down": ["int", ["pointer"]],
	"chewing_handle_Capslock": ["int", ["pointer"]],
	"chewing_handle_Default": ["int", ["pointer", "int"]],
	"chewing_handle_CtrlNum": ["int", ["pointer","int"]],
	"chewing_handle_ShiftSpace": ["int", ["pointer"]],
	"chewing_handle_DblTab": ["int", ["pointer"]],
	"chewing_handle_Numlock": ["int", ["pointer", "int"]],
	"chewing_new": ["pointer", []],
	"chewing_delete": ["void", ["pointer"]],
	"chewing_free": ["void", ["pointer"]],
	// NOTE: These APIs do not seems to be used?
	// "chewing_Init": ["int", ["string", "string"]],
	// "chewing_Reset": ["int", ["pointer"]],
	// "chewing_Terminate": ["void", []],
	"chewing_Configure": ["int", ["pointer", "pointer"]],
	"chewing_set_KBType": ["int", ["pointer", "int"]],
	"chewing_get_KBType": ["int", ["pointer"]],
	"chewing_get_KBString": ["char*", ["pointer"]],
	// FIXME: "chewing_KBStr2Num": ["int", [char str[]]],
	"chewing_set_ChiEngMode": ["void", ["pointer", "int"]],
	"chewing_get_ChiEngMode": ["int", ["pointer"]],
	"chewing_set_ShapeMode": ["void", ["pointer", "int"]],
	"chewing_get_ShapeMode": ["int", ["pointer"]],
	"chewing_set_candPerPage": ["void", ["pointer", "int"]],
	"chewing_get_candPerPage": ["int", ["pointer"]],
	"chewing_set_maxChiSymbolLen": ["void", ["pointer", "int"]],
	"chewing_get_maxChiSymbolLen": ["int", ["pointer"]],
	// FIXME: "chewing_set_selKey": ["void", ["pointer", int *selkeys, int len]],
	// FIXME: "chewing_get_selKey": ["int*", ["pointer"]],
	"chewing_set_addPhraseDirection": ["void", ["pointer", "int"]],
	"chewing_get_addPhraseDirection": ["int", ["pointer"]],
	"chewing_set_spaceAsSelection": ["void", ["pointer", "int"]],
	"chewing_get_spaceAsSelection": ["int", ["pointer"]],
	"chewing_set_escCleanAllBuf": ["void", ["pointer", "int"]],
	"chewing_get_escCleanAllBuf": ["int", ["pointer"]],
	"chewing_set_hsuSelKeyType": ["void", ["pointer", "int"]],
	"chewing_get_hsuSelKeyType": ["int", ["pointer"]],
	"chewing_set_autoShiftCur": ["void", ["pointer", "int"]],
	"chewing_get_autoShiftCur": ["int", ["pointer"]],
	"chewing_set_easySymbolInput": ["void", ["pointer", "int"]],
	"chewing_get_easySymbolInput": ["int", ["pointer"]],
	"chewing_set_phraseChoiceRearward": ["void", ["pointer", "int"]],
	"chewing_get_phraseChoiceRearward": ["int", ["pointer"]],
	// FIXME: "ushort*" chewing_get_phoneSeq("pointer");
	"chewing_get_phoneSeqLen": ["int", ["pointer"]],
	// ============ mod_aux.h ============
	"chewing_commit_Check": ["int", ["pointer"]],
	"chewing_commit_String": ["pointer", ["pointer"]],
	"chewing_buffer_String": ["pointer", ["pointer"]],
	"chewing_buffer_Check": ["int", ["pointer"]],
	"chewing_buffer_Len": ["int", ["pointer"]],
	"chewing_zuin_String": ["pointer", ["pointer", "int"]],
	"chewing_zuin_Check": ["int", ["pointer"]],
	"chewing_cursor_Current": ["int", ["pointer"]],
	"chewing_cand_CheckDone": ["int", ["pointer"]],
	"chewing_cand_TotalPage": ["int", ["pointer"]],
	"chewing_cand_ChoicePerPage": ["int", ["pointer"]],
	"chewing_cand_TotalChoice": ["int", ["pointer"]],
	"chewing_cand_CurrentPage": ["int", ["pointer"]],
	"chewing_cand_Enumerate": ["void", ["pointer"]],
	"chewing_cand_hasNext": ["int", ["pointer"]],
	"chewing_cand_String": ["pointer", ["pointer"]],
	"chewing_cand_String_by_index": ["pointer", ["pointer", "int"]],
	"chewing_interval_Enumerate": ["void", ["pointer"]],
	"chewing_interval_hasNext": ["int", ["pointer"]],
	// FIXME: "chewing_interval_Get": ["void", ["pointer", IntervalType *it]],
	"chewing_aux_Check": ["int", ["pointer"]],
	"chewing_aux_Length": ["int", ["pointer"]],
	"chewing_aux_String": ["pointer", ["pointer"]],
	"chewing_keystroke_CheckIgnore": ["int", ["pointer"]],
	"chewing_keystroke_CheckAbsorb": ["int", ["pointer"]],
	"chewing_kbtype_Total": ["int", ["pointer"]],
	"chewing_kbtype_Enumerate": ["void", ["pointer"]],
	"chewing_kbtype_hasNext": ["int", ["pointer"]],
	"chewing_kbtype_String": ["pointer", ["pointer"]]
});

var ctx = chewing.chewing_new();
if(!ctx.isNull()) {
	console.log("chewing context:" + ctx.address());
	chewing.chewing_set_maxChiSymbolLen(ctx, 40);
	var keys = 'hk4g4'; // test: type £©£­£¿£¦£¿ (key: h,k,4,g,4)
	for(i = 0; i < keys.length; ++i)
		chewing.chewing_handle_Default(ctx, keys.charCodeAt(i));
	var str = chewing.chewing_buffer_String(ctx);
	var bufferStr = str.readCString(); // get the UTF-8 string from the pointer
	chewing.chewing_free(str); // free the buffer

	console.log("buffer = " + bufferStr);
	chewing.chewing_delete(ctx); // free chewing context
}
else {
	console.log("chewing failed!");
}
