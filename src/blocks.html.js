Villain.Blocks.Html = Villain.Block.extend({
    type: 'html',
    template: _.template(
        '<div class="villain-html-block villain-content"><textarea><%= content %></textarea></div>'
    ),

    events: {
        'keyup textarea': '_growTextarea',
    },

    initialize: function(json, store) {
        Villain.Block.prototype.initialize.apply(this, [json, store]);
        _.extend(this.events, Villain.Block.prototype.events);
    },

    _propTextarea: function(e) {
        console.log("prop change");
    },

    _inputTextarea: function(e) {
        console.log(e);
    },

    _growTextarea: function(e) {
        this.growTextarea(e.target);
    },

    growTextarea: function(textarea) {
        textarea.style.height = "5px";
        textarea.style.height = (textarea.scrollHeight)+"px";
    },

    afterRenderCallback: function() {
        var that = this;
        setTimeout(function() {that.growTextarea(that.$('textarea')[0]);}, 1000);
    },

    renderEditorHtml: function() {
        blockTemplate = this.renderContentBlockHtml();
        actionsTemplate = this.actionsTemplate();
        wrapperTemplate = this.wrapperTemplate({content: blockTemplate, actions: actionsTemplate});
        return wrapperTemplate;
    },

    renderContentBlockHtml: function() {
        text = this.getTextBlockInner() ? this.getTextBlockInner() : this.data.text;
        return this.template({content: text});
    },

    renderEmpty: function() {
        blockTemplate = this.template({content: '<p>Text</p>'});
        actionsTemplate = this.actionsTemplate();
        wrapperTemplate = this.wrapperTemplate({content: blockTemplate, actions: actionsTemplate});
        return wrapperTemplate;
    },

    getJSON: function() {
        textNode = this.$('textarea').val();

        data = this.getData();
        json = {
            type: this.type,
            data: {
                text: textNode
            }
        };
        return json;
    },

    getHTML: function() {
        textNode = this.$('textarea').val();
        return textNode;
    }
},
{
    /* static methods */
    getButton: function(afterId) {
        var blockType = 'html';
        t = _.template([
            '<button class="villain-block-button" data-type="<%= type %>" data-after-block-id="<%= id %>">',
            '<i class="fa fa-code"></i>',
            '<p>html</p>',
            '</button>'].join('\n'));
        return t({id: afterId, type: blockType});
    }
});
