import { ListOrder } from '../../../types/list';

interface ListOptionsProps {
  toggleCurrentListOrder: () => void;
  order: ListOrder;
  toggleInvertWordWithTrad: () => void;
  invertWordWithTrad: boolean;
  toggleShowRightPart: () => void;
  showRightPart: boolean;
}

const ListOptions = (props: ListOptionsProps) => {

  const {
    toggleCurrentListOrder,
    order,
    toggleInvertWordWithTrad,
    invertWordWithTrad,
    toggleShowRightPart,
    showRightPart
  } = props;

  return (
    <div className='options'>
      <button
        onClick={toggleCurrentListOrder}
        className='order'
      >
        ordre
        <span className='material-symbols-rounded'>
          { order === 'asc' ? 'arrow_drop_down' : 'arrow_drop_up' }
        </span>
      </button>

      <button
        onClick={toggleInvertWordWithTrad}
        className='invert-word-with-trad'
      >
        { invertWordWithTrad ? 'fr' : 'en' }
        <span className='material-symbols-rounded'>swap_horiz</span>
        { invertWordWithTrad ? 'en' : 'fr' }
      </button>

      <button
        className='hide-right-part-btn'
        onClick={toggleShowRightPart}
      >
        cacher
        <span className='material-symbols-rounded'>
          { showRightPart ? 'visibility' : 'visibility_off' }
        </span>
      </button>
    </div>
  );
}

export default ListOptions;
