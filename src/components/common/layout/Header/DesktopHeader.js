/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Flux
import AccountStore from '../../../../stores/Account/AccountStore';
import ApplicationStore from '../../../../stores/Application/ApplicationStore';
import CartStore from '../../../../stores/Cart/CartStore';
import DrawerStore from '../../../../stores/Application/DrawerStore';
import IntlStore from '../../../../stores/Application/IntlStore';
import triggerDrawer from '../../../../actions/Application/triggerDrawer';

// Required components
import Badge from '../../indicators/Badge';
import CollectionTreeMenu from '../../navigation/CollectionTreeMenu';
import MainNavigation from '../../navigation/MainNavigation';
import Text from '../../typography/Text';

// Translation data for this component
import intlData from './DesktopHeader.intl';

/**
 * Component
 */
class DesktopHeader extends React.Component {
	static contextTypes = {
		executeAction: React.PropTypes.func.isRequired,
		getStore: React.PropTypes.func.isRequired,
		router: React.PropTypes.func.isRequired
	};

	//*** Initial State ***//

	state = {
		cartTotalItems: this.context.getStore(CartStore).getTotalItems(),
		user: this.context.getStore(AccountStore).getAccountDetails(),
		openedDrawer: this.context.getStore(DrawerStore).getOpenedDrawer(),
		collectionsTreeMenuEnabled: false,
		hasScrolledHeader: false,
		hasAnimated: false
	};

	//*** Component Lifecycle ***//

	componentDidMount() {
		// Component styles
		require('./DesktopHeader.scss');
		window.addEventListener('scroll', this._calcScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._calcScroll);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			cartTotalItems: nextProps._cartTotalItems,
			user: nextProps._user,
			openedDrawer: nextProps._openedDrawer
		});
	}

	//*** View Controllers ***//

	handleBtnClick = drawer => {
		this.context.executeAction(triggerDrawer, drawer);
	};

	_calcScroll = header => {
		const _window = window;

		const heightDiff = 100;
		const scrollPos = _window.scrollY;
		if (scrollPos > heightDiff) {
			this.setState(
				{
					hasScrolledHeader: true
				},
				() =>
					setTimeout(() => {
						this.setState({ hasAnimated: true });
					}, 150)
			);
		} else {
			this.setState({
				hasScrolledHeader: false,
				hasAnimated: false
			});
		}
	};

	//*** Template ***//

	render() {
		const AppStore = this.context.getStore(ApplicationStore).getState();
		const fullScreenRoutes = ['/.{2}$', '/.{2}/aboutus$'];
		let isFullScreenRoute = false;
		if (!AppStore || !AppStore.currentRoute || !AppStore.currentRoute.path) {
			return false;
		}
		const currentRoute = AppStore.currentRoute.path;
		for (let route of fullScreenRoutes) {
			const regx = new RegExp(route);
			if (regx.test(currentRoute)) {
				isFullScreenRoute = true;
			}
		}

		// Helper variables
		let intlStore = this.context.getStore(IntlStore);
		let routeParams = {
			locale: this.context.getStore(IntlStore).getCurrentLocale()
		};
		let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);

		// Return
		return (
			<div
				className={`desktop-header${this.state.hasScrolledHeader ||
				!isFullScreenRoute
					? ' desktop-header-bg-position'
					: ''}${this.state.hasAnimated || !isFullScreenRoute
					? ' desktop-header-bg-visible'
					: ''}`}
			>
				<div className="desktop-header__container">
					<div className="desktop-header__row">
						<div className="desktop-header__container-left-column">
							<Link
								className="desktop-header__logo-link"
								to="homepage"
								params={routeParams}
							>
								<div className="desktop-header__logo" />
							</Link>
							<div className="desktop-header__navigation">
								<MainNavigation links={this.props.collections} />
							</div>
						</div>
						<div className="desktop-header__container-right-column">
							{this.state.user ? (
								<div className="desktop-header__account">
									<div className="desktop-header__logout-button">
										<Link to="logout" params={routeParams}>
											<Text size="small">
												<FormattedMessage
													message={intlStore.getMessage(intlData, 'logout')}
													locales={intlStore.getCurrentLocale()}
												/>
											</Text>
										</Link>
									</div>
									{isAdmin && (
										<div className="desktop-header__admin-button">
											<Link to="adm" params={routeParams}>
												<Text size="small">
													<FormattedMessage
														message={intlStore.getMessage(intlData, 'admin')}
														locales={intlStore.getCurrentLocale()}
													/>
												</Text>
											</Link>
										</div>
									)}

									<Link className="desktop-header__account-button" to="account" params={routeParams}>
										<div>
											<Text size="small">
												<FormattedMessage
													message={intlStore.getMessage(intlData, 'hi')}
													locales={intlStore.getCurrentLocale()}
												/>, {this.state.user.name.split(' ')[0]}
											</Text>
										</div>
										<div>
											<Text size="small" weight="bold">
												<FormattedMessage
													message={intlStore.getMessage(
														intlData,
														'myAccount'
													)}
													locales={intlStore.getCurrentLocale()}
												/>
											</Text>
										</div>
									</Link>

								</div>
							) : (
								<div className="desktop-header__account">
									<div className="desktop-header__register-button">
										<Link to="register" params={routeParams}>
											<Text size="medium">
												<FormattedMessage
													message={intlStore.getMessage(intlData, 'register')}
													locales={intlStore.getCurrentLocale()}
												/>
											</Text>
										</Link>
									</div>

									<Link className="desktop-header__login-button" to="login" params={routeParams}>
										<Text size="medium">
											<FormattedMessage
												message={intlStore.getMessage(intlData, 'login')}
												locales={intlStore.getCurrentLocale()}
											/>
										</Text>
									</Link>

								</div>
							)}
							<div
								className="desktop-header__cart fa fa-shopping-bag"
								onClick={this.handleBtnClick.bind(null, 'cart')}
							>
								<Badge
									value={
										this.state.cartTotalItems > 0
											? this.state.cartTotalItems
											: null
									}
								/>
							</div>
						</div>
					</div>
					{this.state.collectionsTreeMenuEnabled &&
					this.props.collectionsTree ? (
						<div className="desktop-header__row">
							<CollectionTreeMenu collections={this.props.collectionsTree} />
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

/**
 * Flux
 */
DesktopHeader = connectToStores(
	DesktopHeader,
	[AccountStore, CartStore, DrawerStore],
	context => {
		return {
			_cartTotalItems: context.getStore(CartStore).getTotalItems(),
			_user: context.getStore(AccountStore).getAccountDetails(),
			_openedDrawer: context.getStore(DrawerStore).getOpenedDrawer()
		};
	}
);

/**
 * Exports
 */
export default DesktopHeader;
