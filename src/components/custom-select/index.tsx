import { Select } from 'chakra-react-select';
function CustionSelect(props: any) {
  return (
    <div style={{ width: props.width }}>
      <Select
        {...props}
        useBasicStyles
        isSearchable={false}
        chakraStyles={{
          control: (provided: any) => ({
            ...provided,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }),
          valueContainer: (provided: any) => ({
            ...provided,
            fontSize: '14px',
            cursor: 'pointer',
          }),
          placeholder: (provided: any) => ({
            ...provided,
            color: '#646a7b',
          }),
          menuList: (provided: any) => ({
            ...provided,
            background: '#0c1437',
            borderRadius: '8px',
            backdropFilter: 'blur(4px)',
            padding: '4px',
          }),
          option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#0c1437  !important' : '',
            color: state.isSelected ? '#fff !important' : 'rgba(255, 255, 255, 0.8) !important',
            boxShadow: '0px 2px 10px 0px #0c1437',
            borderRadius: '4px',
            margin: '4px 0',
            _hover: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }),
        }}
      />
    </div>
  );
}

export default CustionSelect;
