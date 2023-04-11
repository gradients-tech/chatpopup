import { FC, HTMLAttributes } from 'react';

type IDropdown = {
	values?: { key: string; value: any }[];
	open?: boolean;
	template?: (value: { key: string; value: any }, props?: any) => JSX.Element;
	onSelect?: (key: string) => void;
	selected?: string;
} & HTMLAttributes<HTMLUListElement>;

const Dropdown: FC<IDropdown> = ({
	values,
	open = false,
	selected,
	onSelect,
	template = (value) => <>{value}</>,
	...rest
}) => {
	return (
		<>
			{open && (
				<ul {...rest} onClick={(e) => e.stopPropagation()}>
					{values?.map(({ key, value }) => (
						<li key={key} onClick={() => onSelect && onSelect(key)}>
							{template({ key, value }, { selected: selected === key })}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default Dropdown;
