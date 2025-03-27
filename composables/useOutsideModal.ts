export const useOutsideModal = () => {
  const dopDate = () => useState<Record<string, string[]>>('dopDate', () => ({}));

  const isOpenModal = () => useState('isOpenModal', () => false);

  const isVisibleBtnProject = () => useState('isVisibleBtnProject', () => false);

  const isSendFormSuccess = () => useState('sendFormSuccess', () => false);

  return {
    dopDate,
    isOpenModal,
    isVisibleBtnProject,
    isSendFormSuccess,
  };
};
