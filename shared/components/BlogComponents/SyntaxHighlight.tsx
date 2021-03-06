// SyntaxHighlight.tsx
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxHighlight = {
  code({ node, inline, className, ...props }: SyntaxHighlighterProps) {
    // Set code language declared in code block: ```lang
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={duotoneDark}
        language={match[1]}
        PreTag="div"
        className="codeStyle"
        showLineNumbers={true}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};

export default SyntaxHighlight;
