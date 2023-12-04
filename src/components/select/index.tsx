import { TriangleDownIcon } from "@chakra-ui/icons"
import { Select } from "@chakra-ui/react"


function FilSelect (props: {
	options: any[],
	defaultVal?: string
	placeholder?: string
	change?: (val: string) => void
}) {
	let {options, defaultVal, placeholder} = props
	if (!defaultVal) {
		defaultVal = options?.[0]?.value
	}
	const handleChange = (e:any) => {
		props?.change(e.target.value)
	}
	return (
		<Select placeholder={placeholder} border="none" icon={<TriangleDownIcon />} iconSize="16" onChange={(e) => handleChange(e)}>
			{
				options?.map((it, index) => {
					return <option value={it.value} key={`${it.value}-${index}`}>{it.label}</option>
				})
			}
		</Select>
	)
}

export default FilSelect