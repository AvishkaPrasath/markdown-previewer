import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(
    '# Welcome to Markdown Previewer!\n\n## Try it out:\n\n' +
    '**Bold text** or *italic text*\n\n' +
    '- List item 1\n- List item 2\n\n' +
    '1. Numbered item\n2. Another numbered item\n\n' +
    '> Blockquote example\n\n' +
    '`inline code`\n\n' +
    '```\nCode block\n```'
  );
  const [html, setHtml] = useState('');

  useEffect(() => {
    // Convert markdown to HTML
    // Note: In a real implementation, you would use marked.js or another markdown library
    // This is a simple example conversion
    const convertToHtml = (md) => {
      return md
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/^([0-9]+\. .*$)/gm, '<li>$1</li>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .split('\n').join('<br/>');
    };

    setHtml(convertToHtml(markdown));
  }, [markdown]);

  const handleSave = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-content.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Markdown Previewer</h1>
        <Button 
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Markdown
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Editor</h2>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-96 p-2 border rounded-md font-mono"
            placeholder="Enter your markdown here..."
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          <div 
            className="w-full h-96 p-2 border rounded-md overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Card>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
