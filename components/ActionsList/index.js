import DueDate from './DueDate';
import ExpandingText from 'components/ExpandingText';
import Heading from 'components/Heading';
import Table, {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData
} from 'components/Table';

const ActionsList = ({ actions }) => (
  <Table className="lbh-actions-list__table">
    <TableHead>
      <TableRow className="lbh-actions-list__header">
        <TableHeader scope="col">Description</TableHeader>
        <TableHeader scope="col" className="lbh-actions-list__due-date">
          Due date
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {actions.map(action => (
        <TableRow key={action.title}>
          <TableData className="lbh-actions-list__description">
            <Heading as="h2" size="m">
              {action.title}
            </Heading>
            <ExpandingText
              expandButtonText="Show details"
              contractButtonText="Hide details"
            >
              {action.description}
            </ExpandingText>
            <div className="lbh-actions-list__descriptions-mobile">
              Due <DueDate dateTime={action.dueDate} />
            </div>
          </TableData>
          <TableData className="lbh-actions-list__due-date">
            <DueDate dateTime={action.dueDate} />
          </TableData>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ActionsList;
