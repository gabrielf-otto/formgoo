import React, { HTMLAttributes } from 'react';
import { Card } from '@material-ui/core';


interface IQuestionCardProps extends HTMLAttributes<HTMLDivElement> {
   questionRef: number;
}

const QuestionCard: React.FC<IQuestionCardProps> = ({ children, ...props }) => (
   <Card {...props}>
      {children}
   </Card>
);


export default QuestionCard;
