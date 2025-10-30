export const TASK_STATUS = {
  backlog: { id: 'backlog', title: 'Бэклог', className: 'backlog' },
  inprogress: { id: 'inprogress', title: 'В процессе', className: 'inprogress' },
  done: { id: 'done', title: 'Готово', className: 'done' },
  trash: { id: 'trash', title: 'Корзина', className: 'trash' },
};

export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
