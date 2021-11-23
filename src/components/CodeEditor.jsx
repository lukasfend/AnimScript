/* eslint-disable no-template-curly-in-string */
import React from 'react'
import Editor, { loader } from "@monaco-editor/react";
import "./CodeEditor.scss";
import {autoCompleteSnippets, autoCompleteText} from '../helpers/AutoCompleteProvider';

loader.init().then((monaco) => {
  // Register a new language
  monaco.languages.register({ id: "animscript" });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider("animscript", {
    tokenizer: {
      root: [
				// Keywords themself
        [/(define)/, "keyword"],
        [/(strokecolor|framerate|fillcolor|backgroundcolor|size|line)/, "renderkeyword"],
        [/(function |endfunction)/, "functiondefinition"],
        [/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, "hex-colorcode"],
        [/\s\d*/, "numbers"],
        [/\$\w*/, "variables"],
        [/\\nfunction .*/, "functionname"],
				


        [/./, "normal-text"]
      ]
    }
  });

  // Define a new theme that contains only rules that match this language
  monaco.editor.defineTheme("animscripttheme", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "2ecc71", fontStyle: "bold" },
      { token: "renderkeyword", foreground: "00d2d3", fontStyle: "bold" },
      { token: "hex-colorcode", foreground: "e67e22" },
      { token: "numbers", foreground: "3498db" },
      { token: "variables", foreground: "f368e0" },
      { token: "functiondefinition", foreground: "f368e0", fontStyle: "italic" },
      { token: "functionname", foreground: "feca57", fontStyle: "italic" },

      { token: "normal-text", foreground: "bdc3c7" },
    ],
		colors: {
			"activityBar.background": "#1d1d1d",
			"activityBarBadge.background": "#00cc00",
			"badge.background": "#2f2f2f",
			"breadcrumb.background": "#131313",
			"breadcrumbPicker.background": "#131313",
			"editor.background": "#010700",
			"editorCursor.foreground": "#bcddbc",
			"editor.foreground": "#d4d4d4",
			"editor.inactiveSelectionBackground": "#3a3d41",
			"editor.selectionHighlightBackground": "#add6ff26",
			"editorGroupHeader.tabsBackground": "#1d1d1d",
			"editorHoverWidget.background": "#1d1d1d",
			"editorIndentGuide.activeBackground": "#707070",
			"editorIndentGuide.background": "#404040",
			"editorSuggestWidget.background": "#131313",
			"editorSuggestWidget.selectedBackground": "#242424",
			"editor.lineHighlightBackground": "#02350666",
			"input.placeholderForeground": "#a6a6a6",
			"list.activeSelectionBackground": "#3eca1b",
			"list.activeSelectionForeground": "#28e231",
			"list.dropBackground": "#383b3d",
			"list.inactiveSelectionBackground": "#131313",
			"list.inactiveSelectionForeground": "#14f031",
			"menu.background": "#252526",
			"menu.foreground": "#cccccc",
			"sideBar.background": "#1d1d1d",
			"sideBarSectionHeader.background": "#00000000",
			"sideBarSectionHeader.border": "#1d1d1d",
			"sideBarTitle.foreground": "#bbbbbb",
			"selection.background": "rgba(40,226,49,0.2)",
			"editorLineNumber.foreground": "#004d00",
			"editorLineNumber.activeForeground": "#0fbd0f",
		}
  });

  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider("animscript", {
    provideCompletionItems: () => {

      var suggestions = [
        {
          label: "function",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "function ${1:functionname}",
            "${2:}",
            "endfunction"
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Function definition"
        }
      ];
			for(let item of autoCompleteSnippets) {
				suggestions.push({
          label: item.label,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: item.insertText,
					detail: item.detail||null,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        });
			}
			for(let item of autoCompleteText) {
				suggestions.push({
          label: item.label,
          kind: monaco.languages.CompletionItemKind.Text,
          insertText: item.label.replace("$",""),
					detail: item.detail||null
				});
			}
      return { suggestions: suggestions };
    }
  });
});

export default function CodeEditor(props) {

	return (
		<div className="codeEditor">
			<Editor
				height="100%"
				onChange={props.onChange}
				value={props.value}
				theme="animscripttheme"
				options={{
					fontFamily: "Consolas"/*"Monego"*/,
					fontSize: "24pt",
					minimap: {
						enabled: false
					}
				}}
				defaultLanguage="animscript"
			/>
		</div>
	)
}
