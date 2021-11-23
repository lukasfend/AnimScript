/* eslint-disable no-template-curly-in-string */
export const autoCompleteSnippets = [
	{
		label: "define",
		insertText: "define ${1:varname} ${2:value}",
		detail: "Defines a new variable"
	},
	{
		label: "size",
		insertText: "size ${1:width} ${2:height}",
		detail: "Changes the size of the canvas"
	},
	{
		label: "background",
		insertText: "background ${1:color}",
		detail: "Changes the background color"
	},
	{
		label: "strokecolor",
		insertText: "strokecolor ${1:color}",
		detail: "Changes the color of lines"
	},
	{
		label: "fillcolor",
		insertText: "fillcolor ${1:color}",
		detail: "Changes the fill color"
	},{
		label: "framerate",
		insertText: "framerate ${1:fps}",
		detail: "Sets the FPS (default = monitor refresh rate)"
	},

];

export const autoCompleteText = [
	{
		label: "$width",
		detail: "The width of the canvas"
	},
	{
		label: "$height",
		detail: "The height of the canvas"
	}
];