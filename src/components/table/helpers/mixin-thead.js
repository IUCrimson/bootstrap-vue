import KeyCodes from '../../../utils/key-codes'
import startCase from '../../../utils/startcase'
import { getComponentConfig } from '../../../utils/config'
import { htmlOrText } from '../../../utils/html'
import filterEvent from './filter-event'
import textSelectionActive from './text-selection-active'

export default {
  props: {
    headVariant: {
      type: String,
      default: () => getComponentConfig('BTable', 'headVariant')
    },
    theadClass: {
      type: [String, Array, Object],
      default: null
    },
    theadTrClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    headClasses() {
      return [this.headVariant ? 'thead-' + this.headVariant : '', this.theadClass]
    }
  },
  methods: {
    fieldClasses(field) {
      // Header field (<th>) classes
      return [
        field.variant ? 'table-' + field.variant : '',
        field.class ? field.class : '',
        field.thClass ? field.thClass : ''
      ]
    },
    headClicked(evt, field, isFoot) {
      if (this.stopIfBusy && this.stopIfBusy(evt)) {
        // If table is busy (via provider) then don't propagate
        return
      } else if (filterEvent(evt)) {
        // Clicked on a non-disabled control so ignore
        return
      } else if (textSelectionActive(this.$el)) {
        // User is selecting text, so ignore
        /* istanbul ignore next: JSDOM doesn't support getSelection() */
        return
      }
      evt.stopPropagation()
      evt.preventDefault()
      this.$emit('head-clicked', field.key, field, evt, isFoot)
    },
    renderThead(isFoot = false) {
      const h = this.$createElement
      const fields = this.computedFields || []

      if (this.isStacked === true || fields.length === 0) {
        // In always stacked mode, we don't bother rendering the head/foot.
        // Or if no field headings (empty table)
        return h()
      }

      // Helper function to generate a field <th> cell
      const makeCell = (field, colIndex) => {
        let ariaLabel = null
        if (!field.label.trim() && !field.headerTitle) {
          // In case field's label and title are empty/blank
          // We need to add a hint about what the column is about for non-sighted users
          /* istanbul ignore next */
          ariaLabel = startCase(field.key)
        }
        const hasHeadClickListener = this.$listeners['head-clicked'] || this.isSortable
        const handlers = {}
        if (hasHeadClickListener) {
          handlers.click = evt => {
            this.headClicked(evt, field, isFoot)
          }
          handlers.keydown = evt => {
            const keyCode = evt.keyCode
            if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
              this.headClicked(evt, field, isFoot)
            }
          }
        }
        const sortAttrs = this.isSortable ? this.sortTheadThAttrs(field.key, field, isFoot) : {}
        const sortClass = this.isSortable ? this.sortTheadThClasses(field.key, field, isFoot) : null
        const data = {
          key: field.key,
          class: [this.fieldClasses(field), sortClass],
          style: field.thStyle || {},
          attrs: {
            // We only add a tabindex of 0 if there is a head-clicked listener
            tabindex: hasHeadClickListener ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            role: 'columnheader',
            scope: 'col',
            'aria-colindex': String(colIndex + 1),
            'aria-label': ariaLabel,
            ...sortAttrs
          },
          on: handlers
        }
        const fieldScope = { label: field.label, column: field.key, field: field }
        let slot
        if (
          isFoot &&
          this.hasNormalizedSlot([`FOOT[${field.key}]`, 'FOOT[]', `FOOT_${field.key}`])
        ) {
          // TODO: `FOOT_${field.key}` is deprecated, to be removed in future release
          slot = this.normalizeSlot(
            [`FOOT[${field.key}]`, 'FOOT[]', `FOOT_${field.key}`],
            fieldScope
          )
        } else {
          // TODO: `HEAD_${field.key}` is deprecated, to be removed in future release
          slot = this.normalizeSlot(
            [`HEAD[${field.key}]`, 'HEAD[]', `HEAD_${field.key}`],
            fieldScope
          )
        }
        if (!slot) {
          data.domProps = htmlOrText(field.labelHtml)
        }
        return h('th', data, slot || field.label)
      }

      // Generate the array of <th> cells
      const $cells = fields.map(makeCell).filter(th => th)

      // Genrate the row(s)
      const $trs = []
      if (isFoot) {
        $trs.push(h('tr', { class: this.tfootTrClass, attrs: { role: 'row' } }, $cells))
      } else {
        const scope = {
          columns: fields.length,
          fields: fields
        }
        $trs.push(this.normalizeSlot('thead-top', scope) || h())
        $trs.push(h('tr', { class: this.theadTrClass, attrs: { role: 'row' } }, $cells))
      }

      return h(
        isFoot ? 'tfoot' : 'thead',
        {
          key: isFoot ? 'tfoot' : 'thead',
          class: isFoot ? this.footClasses : this.headClasses,
          attrs: { role: 'rowgroup' }
        },
        $trs
      )
    }
  }
}
