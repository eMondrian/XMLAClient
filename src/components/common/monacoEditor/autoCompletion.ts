import * as monaco from 'monaco-editor'

monaco.languages.setMonarchTokensProvider('sql', {
  tokenizer: {
    root: [
      [
        /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|DROP|ALTER|TABLE|JOIN|ON|GROUP BY|ORDER BY)\b/,
        'keyword'
      ],
      [/'.*?'/, 'string'],
      [/\b\d+(\.\d+)?\b/, 'number'],
      [/\b[a-zA-Z_][\w$]*\b/, 'identifier'],
      [/--.*$/, 'comment'],
      [/\/\*/, { token: 'comment.block', next: 'comment' }]
    ],
    comment: [
      [/[^*/]+/, 'comment.block'],
      [/\/\*/, { token: 'comment.block', next: 'comment' }],
      [/\*\//, { token: 'comment.block', next: '@pop' }],
      [/./, 'comment.block']
    ]
  }
})

monaco.languages.registerCompletionItemProvider('sql', {
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position)
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn
    }

    const suggestions = [
      {
        label: 'SELECT',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'SELECT',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range
      },
      {
        label: 'INSERT',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'INSERT',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range
      },
      {
        label: 'UPDATE',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'UPDATE',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range
      }
    ]

    return { suggestions: suggestions }
  }
})
