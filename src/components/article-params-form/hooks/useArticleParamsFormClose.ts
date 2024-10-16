import { useEffect } from 'react';

type UseArticleParamsFormCloseProps = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useArticleParamsFormClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseArticleParamsFormCloseProps) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				onClose?.();
				onChange(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
				onChange(false);
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
			window.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, rootRef, onClose, onChange]);
};
