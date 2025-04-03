export type ConvertFormProps = {
  onAfterConvert: () => void;
};

export type ConvertFormState = {
  text: string;
  loading: boolean;
  progress: number;
  isPending: boolean;
};

export type ConvertButtonProps = {
  loading: boolean;
  isPending: boolean;
  progress: number;
  disabled: boolean;
}; 