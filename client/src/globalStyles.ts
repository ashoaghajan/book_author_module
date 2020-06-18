import { makeStyles } from '@material-ui/core/styles';

// styling for modals
export function getModalStyle() {
    const top = 50;
    const left = 50;
    
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

//modal width 400px
export const useSmallStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3), 
        overflowX: 'hidden',
        overflowY: 'scroll',
        maxHeight: 800
    },
}));


//styling fot buttons
export const styles =  {
    button: {
        margin: '5px'
    }
}

// types, functionality & styling of sorted tables
type SortConfig = {
    key: string;
    direction: string;
}

type SetSortConfig = React.Dispatch<React.SetStateAction<{
    key: string;
    direction: string;
}>>

export const requestSort = (key: string, sortConfig: SortConfig, setSortConfig: SetSortConfig) => {
    let direction = 'ascending';
    if (sortConfig.key && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

export  const getClassNamesFor = (name: string, sortConfig: SortConfig) => {
    if (!sortConfig.key) {
      return;
    } 
    else if(sortConfig.key === name){
      return (sortConfig.direction === 'descending') ? 'arrow_upward' : 'arrow_downward';
    } 
    else {
      return undefined
    }
  };

  // callback for modal useMemo
  export const callback = (sortConfig: SortConfig, array: Array<any>) => {
    return () => {
      let sortableItems = [...array];
      if (sortConfig.key !== '') {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }
  }