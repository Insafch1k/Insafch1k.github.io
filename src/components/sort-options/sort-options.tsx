import { SortOffersType } from '../../const';
import { SortOffer } from '../../types/sort';

type SortOptionsProps = {
  activeSorting: SortOffer;
  onChange: (sortType: SortOffer) => void;
};

const SORT_OPTIONS = Object.keys(SortOffersType) as SortOffer[];

function SortOptions({ activeSorting, onChange }: SortOptionsProps) {
  return (
    <div className="places__sorting">
      <label className="places__sorting-caption" htmlFor="sort-select">
        Sort by
      </label>
      <select
        id="sort-select"
        className="places__sorting-type"
        value={activeSorting}
        onChange={(e) => onChange(e.target.value as SortOffer)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SortOffersType[option]}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SortOptions };

