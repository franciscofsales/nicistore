/**
 * Imports
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import { slugify } from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Heading from '../typography/Heading';
import Pagination from '../navigation/Pagination';
import Text from '../typography/Text';

// Translation data for this component
import intlData from './CollectionsList.intl';

/**
 * Component
 */

class CollectionsList extends React.Component {
	static contextTypes = {
		getStore: React.PropTypes.func.isRequired
	};

	//*** Component Lifecycle ***//

	componentDidMount() {
		// Component styles
		require('./CollectionsList.scss');
	}

	//*** Template ***//

	render() {
		let intlStore = this.context.getStore(IntlStore);
		// Base route params
		let routeParams = { locale: intlStore.getCurrentLocale() };
		return (
			<div className="collection-list__wrapper">
				{this.props.title ? (
					<div className="collection-list__title">
						<Heading size="medium">{this.props.title}</Heading>
					</div>
				) : null}
				<div className="collection-list__container">
					{this.props.filters.map((item, idx) => {
						let links = item.collections.map(col => {
							return {
								name: intlStore.getMessage(col.name),
								to: 'collection-slug',
								params: {
									locale: intlStore.getCurrentLocale(),
									collectionId: col.id,
									collectionSlug: slugify(intlStore.getMessage(col.name))
								},
								selected: this.props.collection
									? col.id === this.props.collection.id
									: false
							};
						});
						if (links.length > 0) {
							return links.map(link => (
								<Link
									className="collection-list__item"
									to="collection-slug"
									params={link.params}
								>
									<FormattedMessage
										className="collection-list__item-label"
										message={link.name}
										locales={intlStore.getCurrentLocale()}
									/>
								</Link>
							));
						}
					})}
				</div>
			</div>
		);
	}
}

export default CollectionsList;
