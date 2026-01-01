import ButtonView from './ButtonView';

interface ButtonContainerProps {
  currentView: string;
}

const ButtonContainer = ({ currentView }: ButtonContainerProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-1.5 rounded-2xl flex gap-2 shadow-lg shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800">
      <ButtonView viewMode="mean" isActive={currentView === 'mean'} href="/" />
      <ButtonView viewMode="distribution" isActive={currentView === 'distribution'} href="/distribution" />
      <ButtonView viewMode="median" isActive={currentView === 'median'} href="/median" />
    </div>
  );
};

export default ButtonContainer;
