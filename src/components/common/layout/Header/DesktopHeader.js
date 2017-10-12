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
import setLocale from '../../../../actions/Application/setLocale';

// Required components
import Badge from '../../indicators/Badge';
import Spinner from '../../indicators/Spinner';
import CollectionTreeMenu from '../../navigation/CollectionTreeMenu';
import MainNavigation from '../../navigation/MainNavigation';
import Text from '../../typography/Text';
import Modal from '../../modals/Modal';

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
		hasAnimated: false,
		isSearch: false,
		searchTerm: '',
		showLangModal: false,
		isChangingLang: false
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

	_handleNewLang = lang => {
		this.context.executeAction(setLocale, lang);
		this.setState({isChangingLang: true});
		setTimeout(
			()=> {
				this.setState({isChangingLang: false, showLangModal: false});
			}, 200
		);
	}

	_handleLangModalClose = () => {
		this.setState({showLangModal: false});
	}

	_calcScroll = header => {
		const _window = window;

		const heightDiff = 100;
		const scrollPos = Math.max(_window.scrollY, 0);
		if (scrollPos > heightDiff && !this._updatingBar) {
			this._updatingBar = true;
			this.setState(
				{
					hasScrolledHeader: true
				},
				() =>
					setTimeout(() => {
						this.setState({ hasAnimated: true });
						this._updatingBar = false;
					}, 75)
			);
		} else if (scrollPos <= heightDiff && !this._updatingBar) {
			this._updatingBar = true;
			setTimeout(()=>{
				this.setState({
					hasScrolledHeader: false,
					hasAnimated: false
				}, ()=>{this._updatingBar = false;});
			}, 300);
		}
	};

	_keyPressInput = e => {
		// if enter
	    if(e.keyCode === 13) {
	      if(this.state.searchTerm && this.state.searchTerm.length > 0){
					this.context.router.transitionTo('product-search', {
	             locale: this.context.getStore(IntlStore).getCurrentLocale()
	         }, {term: this.state.searchTerm});
					 this.setState({searchTerm: '', isSearch: false});
				}
	    }
    }

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
				className={
					`desktop-header${
						this.state.hasScrolledHeader || !isFullScreenRoute ? ' desktop-header-bg-position'
					: ''}
						${this.state.hasAnimated || !isFullScreenRoute ? ' desktop-header-bg-visible'
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
							{!this.state.isSearch && (this.state.user ? (
								<div className="desktop-header__account">
									<Link
										className="desktop-header__logout-button"
										to="logout"
										params={routeParams}
									>
										<Text size="small">
											<FormattedMessage
												message={intlStore.getMessage(intlData, 'logout')}
												locales={intlStore.getCurrentLocale()}
											/>
										</Text>
									</Link>

									{isAdmin && !this.state.isSearch && (
										<Link
											className="desktop-header__admin-button"
											to="adm"
											params={routeParams}
										>
											<Text size="small">
												<FormattedMessage
													message={intlStore.getMessage(intlData, 'admin')}
													locales={intlStore.getCurrentLocale()}
												/>
											</Text>
										</Link>
									)}

									<Link
										className="desktop-header__account-button"
										to="account"
										params={routeParams}
									>
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
													message={intlStore.getMessage(intlData, 'myAccount')}
													locales={intlStore.getCurrentLocale()}
												/>
											</Text>
										</div>
									</Link>
								</div>
							) : (
								<div className="desktop-header__account">
									<Link
										className="desktop-header__register-button"
										to="register"
										params={routeParams}
									>
										{intlStore.getMessage(intlData, 'register')}
									</Link>

									<Link
										className="desktop-header__login-button"
										to="login"
										params={routeParams}
									>
										{intlStore.getMessage(intlData, 'login')}
									</Link>
								</div>
							))}
							{this.state.showLangModal && (
        						<Modal title={intlStore.getMessage(intlData, 'selectLanguage')}
                           			onCloseClick={this.state.isChangingLang ? null : this._handleLangModalClose}>
                           			{!this.state.isChangingLang ? (<div className="desktop-header__lang-modal-container">
                           				<div className="desktop-header__lang-modal-item" onClick={this._handleNewLang.bind(null, 'pt')}>
                           					Português
                           				</div>
                           				<div className="desktop-header__lang-modal-item" onClick={this._handleNewLang.bind(null, 'en')}>
                           					English
                           				</div>
                           			</div>) : <div className="desktop-header__lang-spinner"><Spinner /></div>}
               					</Modal>
                           	)}
							{!this.state.isSearch && (<div
								className="desktop-header__lang fa fa-language"
								onClick={() => this.setState({showLangModal: true})}
							/>)}
							{this.state.isSearch && (<div className="desktop-header__search-box-container">
								<input
									autoFocus
									className="desktop-header__search-box"
									value={this.state.searchTerm}
									onChange={ev=> {this.setState({searchTerm: ev.target.value})}}
									onKeyDown={this._keyPressInput}
								/>
								<div
									className="desktop-header__search fa fa-close"
									onClick={() => this.setState({isSearch: !this.state.isSearch})}
								/>
							</div>)}
							{!this.state.isSearch && (<div
								className="desktop-header__search fa fa-search"
								onClick={() => this.setState({isSearch: !this.state.isSearch})}
							/>)}
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
