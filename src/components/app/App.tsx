import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleChangeArticleState = (state: ArticleStateType) => {
		setArticleState(state);
	};

	const handleResetArticleState = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				сhangeArticleState={handleChangeArticleState}
				resetArticleState={handleResetArticleState}
			/>
			<Article />
		</main>
	);
};
