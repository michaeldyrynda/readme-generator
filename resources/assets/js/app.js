var Vue = require('vue'),
    _ = require('underscore'),
    marked = require('marked'),
    modal = require('vue-strap/dist/vue-strap.min').modal,
    Clipboard = require('clipboard');

Vue.filter('nl2br', {

    write(value) {
        if (value && value.constructor === Array) {
            return value.join('\n\n');
        }
    },
    
    read(value) {
        if (value && value.constructor === Array) {
            return value.join('\n\n');
        }
    }

});

new Vue({

    el: '#app',

    components: { modal },

    data: {

        markdownSource: {

            title: '# My new project',
            headingIntro: "## Introduction",
            introduction: "> An introduction or lead on what problem you're solving. Answer the question, \"Why does someone need this?\"",
            headingCodeSamples: "## Code Samples",
            codeSamples: "> You've gotten their attention in the introduction, now show a few code examples. So they get a visualization and as a bonus, make them copy/paste friendly.",
            headingInstallation: "## Installation",
            installation: "> The installation instructions are low priority in the readme and should come at the bottom. The first part answers all their objections and now that they want to use it, show them how.",

        },

        generatedMarkdown: "",

        showMarkdownModal: false,

        outputCopied: false,

        copiedMessage: '',

    },

    ready() {

        new Clipboard('.clipper').on('success', (e) => {
            this.outputCopied = true;
            this.copiedMessage = 'Copied!';
        }).on('error', (e) => {
            this.outputCopied = true;
            this.copiedMessage = 'Press Cmd/Ctrl+C to copy';
        });

    },

    filters: {

        marked: marked

    },

    methods: {

        fetchRawMarkdown() {

            if (this.markdownSource.title.substring(0, 1) !== '#') {
                this.markdownSource.title = '# ' + this.markdownSource.title;
            }

            this.generatedMarkdown = _.map(this.markdownSource, function (text) {
                return text;
            });

            this.showMarkdownModal = true;
        },

        closeModal() {

            this.showMarkdownModal = false;
            this.outputCopied = false;

        }

    }

});

// Handling to make sure you a tab inserts four spaces in the text area.
var textareas = document.getElementsByTagName('textarea');

for (var i = 0; i < textareas.length; i++) {
    textareas[i].onkeydown = function (e) {
        if (e.keyCode == 9 || e.which == 9) {
            e.preventDefault();
            var s = this.selectionStart + '    '.length;
            this.value = this.value.substring(0, this.selectionStart) + '    ' + this.value.substring(this.selectionStart, this.value.length);
            this.selectionStart = this.selectionEnd = s+1;
            this.focus();
        }
    }
}
