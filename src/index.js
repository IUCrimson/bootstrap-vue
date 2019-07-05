import { installFactory } from './utils/plugins'
import { componentsPlugin } from './components'
import { directivesPlugin } from './directives'
import { BVConfigPlugin } from './bv-config'

//
// Named exports for BvConfigPlugin
//
export {
  // BV Config Plugin
  BVConfigPlugin,
  // BVConfigPlugin has been documented as BVConfig as well,
  // so we add an alias to the shorter name for backwards compat
  BVConfigPlugin as BVConfig
}

//
// Export named injection plugins
//
export { BVModalPlugin } from './components/modal/helpers/bv-modal'
export { BVToastPlugin } from './components/toast/helpers/bv-toast'

//
// Export all individual components and component group plugins as named exports.
//

// Webpack 4 has optimization difficulties with re-eport of re-exports, so
// we import the components individulaly here for better tree shaking,
//
// Webpack v5 fixes the optimizations with re-export of re-exports so this
// can be reverted back to `export * from './table'` when Webpack v5 is released.
// https://github.com/webpack/webpack/pull/9203 (available in Webpack v5.0.0-alpha.15)

// export * from './alert'
export { AlertPlugin } from './components/alert'
export { BAlert } from './components/alert/alert'

// export * from './badge'
export { BadgePlugin } from './components/badge'
export { BBadge } from './components/badge/badge'

// export * from './breadcrumb'
export { BreadcrumbPlugin } from './components/breadcrumb'
export { BBreadcrumb } from './components/breadcrumb/breadcrumb'
export { BBreadcrumbItem } from './components/breadcrumb/breadcrumb-item'

// export * from './button'
export { ButtonPlugin } from './components/button'
export { BButton } from './components/button/button'
export { BButtonClose } from './components/button/button-close'

// export * from './button-group'
export { ButtonGroupPlugin } from './components/button-group'
export { BButtonGroup } from './components/button-group/button-group'

// export * from './button-toolbar'
export { ButtonToolbarPlugin } from './components/button-toolbar'
export { BButtonToolbar } from './components/button-toolbar/button-toolbar'

// export * from './card'
export { CardPlugin } from './components/card'
export { BCard } from './components/card/card'
export { BCardBody } from './components/card/card-body'
export { BCardFooter } from './components/card/card-footer'
export { BCardGroup } from './components/card/card-group'
export { BCardHeader } from './components/card/card-header'
export { BCardImg } from './components/card/card-img'
export { BCardImgLazy } from './components/card/card-img-lazy'
export { BCardSubTitle } from './components/card/card-sub-title'
export { BCardText } from './components/card/card-text'
export { BCardTitle } from './components/card/card-title'

// export * from './carousel'
export { CarouselPlugin } from './components/carousel'
export { BCarousel } from './components/carousel/carousel'
export { BCarouselSlide } from './components/carousel/carousel-slide'

// export * from './collapse'
export { CollapsePlugin } from './components/collapse'
export { BCollapse } from './components/collapse/collapse'

// export * from './dropdown'
export { DropdownPlugin } from './components/dropdown'
export { BDropdown } from './components/dropdown/dropdown'
export { BDropdownItem } from './components/dropdown/dropdown-item'
export { BDropdownItemButton } from './components/dropdown/dropdown-item-button'
export { BDropdownDivider } from './components/dropdown/dropdown-divider'
export { BDropdownForm } from './components/dropdown/dropdown-form'
export { BDropdownGroup } from './components/dropdown/dropdown-group'
export { BDropdownHeader } from './components/dropdown/dropdown-header'
export { BDropdownText } from './components/dropdown/dropdown-text'

// export * from './embed'
export { EmbedPlugin } from './components/embed'
export { BEmbed } from './components/embed/embed'

// export * from './form'
export { FormPlugin } from './components/form'
export { BForm } from './components/form/form'
export { BFormDatalist } from './components/form/form-datalist'
export { BFormText } from './components/form/form-text'
export { BFormInvalidFeedback } from './components/form/form-invalid-feedback'
export { BFormValidFeedback } from './components/form/form-valid-feedback'

// export * from './form-checkbox'
export { FormCheckboxPlugin } from './components/form-checkbox'
export { BFormCheckbox } from './components/form-checkbox/form-checkbox'
export { BFormCheckboxGroup } from './components/form-checkbox/form-checkbox-group'

// export * from './form-file'
export { FormFilePlugin } from './components/form-file'
export { BFormFile } from './components/form-file/form-file'

// export * from './form-group'
export { FormGroupPlugin } from './components/form-group'
export { BFormGroup } from './components/form-group/form-group'

// export * from './form-input'
export { FormInputPlugin } from './components/form-input'
export { BFormInput } from './components/form-input/form-input'

// export * from './form-radio'
export { FormRadioPlugin } from './components/form-radio'
export { BFormRadio } from './components/form-radio/form-radio'
export { BFormRadioGroup } from './components/form-radio/form-radio-group'

// export * from './form-select'
export { FormSelectPlugin } from './components/form-select'
export { BFormSelect } from './components/form-select/form-select'

// export * from './form-textarea'
export { FormTextareaPlugin } from './components/form-textarea'
export { BFormTextarea } from './components/form-textarea/form-textarea'

// export * from './image'
export { ImagePlugin } from './components/image'
export { BImg } from './components/image/img'
export { BImgLazy } from './components/image/img-lazy'

// export * from './input-group'
export { InputGroupPlugin } from './components/input-group'
export { BInputGroup } from './components/input-group/input-group'
export { BInputGroupAddon } from './components/input-group/input-group-addon'
export { BInputGroupAppend } from './components/input-group/input-group-append'
export { BInputGroupPrepend } from './components/input-group/input-group-prepend'
export { BInputGroupText } from './components/input-group/input-group-text'

// export * from './jumbotron'
export { JumbotronPlugin } from './components/jumbotron'
export { BJumbotron } from './components/jumbotron/jumbotron'

// export * from './layout'
export { LayoutPlugin } from './components/layout'
export { BContainer } from './components/layout/container'
export { BRow } from './components/layout/row'
export { BCol } from './components/layout/col'
export { BFormRow } from './components/layout/form-row'

// export * from './link'
export { LinkPlugin } from './components/link'
export { BLink } from './components/link/link'

// export * from './list-group'
export { ListGroupPlugin } from './components/list-group'
export { BListGroup } from './components/list-group/list-group'
export { BListGroupItem } from './components/list-group/list-group-item'

// export * from './media'
export { MediaPlugin } from './components/media'
export { BMedia } from './components/media/media'
export { BMediaAside } from './components/media/media-aside'
export { BMediaBody } from './components/media/media-body'

// export * from './modal'
export { ModalPlugin } from './components/modal'
export { BModal } from './components/modal/modal'

// export * from './nav'
export { NavPlugin } from './components/nav'
export { BNav } from './components/nav/nav'
export { BNavForm } from './components/nav/nav-form'
export { BNavItem } from './components/nav/nav-item'
export { BNavItemDropdown } from './components/nav/nav-item-dropdown'
export { BNavText } from './components/nav/nav-text'

// export * from './navbar'
export { NavbarPlugin } from './components/navbar'
export { BNavbar } from './components/navbar/navbar'
export { BNavbarBrand } from './components/navbar/navbar-brand'
export { BNavbarNav } from './components/navbar/navbar-nav'
export { BNavbarToggle } from './components/navbar/navbar-toggle'

// export * from './pagination'
export { PaginationPlugin } from './components/pagination'
export { BPagination } from './components/pagination/pagination'

// export * from './pagination-nav'
export { PaginationNavPlugin } from './components/pagination-nav'
export { BPaginationNav } from './components/pagination-nav/pagination-nav'

// export * from './popover'
export { PopoverPlugin } from './components/popover'
export { BPopover } from './components/popover/popover'

// export * from './progress'
export { ProgressPlugin } from './components/progress'
export { BProgress } from './components/progress/progress'
export { BProgressBar } from './components/progress/progress-bar'

// export * from './spinner'
export { SpinnerPlugin } from './components/spinner'
export { BSpinner } from './components/spinner/spinner'

// export * from './table'
export { TablePlugin } from './components/table'
export { BTable } from './components/table/table'
export { BTableLite } from './components/table/table-lite'

// export * from './tabs'
export { TabsPlugin } from './components/tabs'
export { BTabs } from './components/tabs/tabs'
export { BTab } from './components/tabs/tab'

// export * from './toast'
export { ToastPlugin } from './components/toast'
export { BToast } from './components/toast/toast'
export { BToaster } from './components/toast/toaster'

// export * from './tooltip'
export { TooltipPlugin } from './components/tooltip'
export { BTooltip } from './components/tooltip/tooltip'

//
// Named exports of all directives (VB<Name>) and Plugins (VB<name>Plugin)
//

// Webpack 4 has optimization difficulties with re-eport of re-exports, so
// we import the directives individulaly here for better tree shaking,
//
// Webpack v5 fixes the optimizations with re-export of re-exports so this
// can be reverted back to `export * from './scrollspy'` when Webpack v5 is released.
// https://github.com/webpack/webpack/pull/9203 (available in Webpack v5.0.0-alpha.15)

// export * from './modal'
export { VBModalPlugin } from './directives/modal'
export { VBModal } from './directives/modal/modal'

// export * from './popover'
export { VBPopoverPlugin } from './directives/popover'
export { VBPopover } from './directives/popover/popover'

// export * from './scrollspy'
export { VBScrollspyPlugin } from './directives/scrollspy'
export { VBScrollspy } from './directives/scrollspy/scrollspy'

// export * from './toggle'
export { VBTogglePlugin } from './directives/toggle'
export { VBToggle } from './directives/toggle/toggle'

// export * from './tooltip'
export { VBTooltipPlugin } from './directives/tooltip'
export { VBTooltip } from './directives/tooltip/tooltip'

//
// BootstrapVue installer
//
// `install` is exported just in case the consumer does not import `default` as
// the plugin in CommonJS build (or does not have interop enabled for CommonJS).
// Both the following will work:
//   BootstrapVue = require('bootstrap-vue')
//   BootstrapVue = require('bootstrap-vue').default
//   Vue.use(BootstrapVue)
export const install = /*#__PURE__*/ installFactory({
  plugins: {
    componentsPlugin,
    directivesPlugin
  }
})

//
// BootstrapVue plugin
//
export const BootstrapVue = /*#__PURE__*/ {
  install: install
}

// Default export is the BootstrapVue plugin
export default BootstrapVue
