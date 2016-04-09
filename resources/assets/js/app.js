var Vue = require('vue'),
    marked = require('marked'),
    modal = require('vue-strap/dist/vue-strap.min').modal;

new Vue({
    el: '#app',
    components: { modal },
    data: {
        headingIntro: "## Introduction",
        headingCodeSamples: "## Code Samples",
        headingInstallation: "## Installation",

        projectTitle: '# My new project',
        projectIntroduction: "> An introduction or lead on what problem you're solving. Answer the question, \"Why does someone need this?\"",
        projectCodeSamples: "> You've gotten their attention in the introduction, now show a few code examples. So they get a visualization and as a bonus, make them copy/paste friendly.",
        projectInstallation: "> The installation instructions are low priority in the readme and should come at the bottom. The first part answers all their objections and now that they want to use it, show them how.",

		generatedMarkdown: ""
    },
    filters: {
        marked: marked
    },
    methods: {
        fetchRawMarkdown() {
			this.generatedMarkdown = "";

            if (this.projectTitle.substring(0, 1) !== '#') {
                this.projectTitle = '#' + this.projectTitle;
            }

            this.generatedMarkdown += this.projectTitle + '\n\n';
            this.generatedMarkdown += this.headingIntro + '\n\n';
            this.generatedMarkdown += this.projectIntroduction + '\n\n';
            this.generatedMarkdown += this.headingCodeSamples + '\n\n';
            this.generatedMarkdown += this.projectCodeSamples + '\n\n';
            this.generatedMarkdown += this.headingInstallation + '\n\n';
            this.generatedMarkdown += this.projectInstallation;
        }
    }
});
