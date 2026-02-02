import React from 'react';
import OriginalDartboard from '../darboard.svg?react';

type InteractiveDartboardProps = {
  lastHitId: string | null;
};

export default function InteractiveDartboard({ lastHitId }: InteractiveDartboardProps) {
  // This is the same logic as your `modifySvgChildren` function,
  // but it's neatly contained within this component.
  const addActiveClassToSVG = (node: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(node)) return node;

    const children = React.Children.map(node.props.children, child => {
      if (React.isValidElement(child) && child.props.id === 'dartboard-segments') {
        const segments = React.Children.map(child.props.children, segment => {
          if (React.isValidElement(segment) && segment.props.id) {
            return React.cloneElement(segment, {
              className: `segment ${lastHitId === segment.props.id ? 'active' : ''}`
            });
          }
          return segment;
        });
        return React.cloneElement(child, {}, segments);
      }
      return child;
    });

    return React.cloneElement(node, {}, children);
  };

  return addActiveClassToSVG(<OriginalDartboard />);
}

