import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { useArticleParamsFormClose } from './hooks/useArticleParamsFormClose';

type ArticleParamsFormProps = {
	сhangeArticleState: (newState: ArticleStateType) => void;
	resetArticleState: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { сhangeArticleState, resetArticleState } = props;
	const [isOpen, setIsOpenForm] = useState<boolean>(false);
	const [currentFormState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const handleOpenForm = () => {
		setIsOpenForm(!isOpen);
	};

	const handleChange = (key: keyof ArticleStateType, option: OptionType) => {
		setFormState((prevState) => ({ ...prevState, [key]: option }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		сhangeArticleState(currentFormState);
	};

	const handleResetFormState = () => {
		setFormState(defaultArticleState);
		resetArticleState();
	};

	useArticleParamsFormClose({
		isOpen,
		rootRef: formRef,
		onChange: setIsOpenForm,
		onClose: () => setIsOpenForm(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpenForm} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetFormState}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={currentFormState.fontFamilyOption}
						onChange={(option) =>
							handleChange('fontFamilyOption', option)
						}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={currentFormState.fontSizeOption}
						onChange={(option) =>
							handleChange('fontSizeOption', option)
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={currentFormState.fontColor}
						onChange={(option) => handleChange('fontColor', option)}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={currentFormState.backgroundColor}
						onChange={(option) =>
							handleChange('backgroundColor', option)
						}></Select>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentFormState.contentWidth}
						onChange={(option) =>
							handleChange('contentWidth', option)
						}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
