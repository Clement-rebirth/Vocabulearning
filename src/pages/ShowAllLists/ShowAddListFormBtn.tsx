interface ShowAddListFormBtnProps {
  addFormIsShow: boolean;
  openAddForm: () => void;
}

export const ShowAddListFormBtn = ({ addFormIsShow, openAddForm }: ShowAddListFormBtnProps) => (
  <button
    className={`add-list-btn ${addFormIsShow ? 'd-none' : ''}`}
    onClick={openAddForm}
  >
    <span className='material-symbols-rounded'>add</span>
    Ajouter une liste
  </button>
);
