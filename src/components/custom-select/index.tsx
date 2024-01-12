import { Select } from 'chakra-react-select';

function CustionSelect(props: any) {
  return (
    <Select
      {...props}
      useBasicStyles
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
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        menuList: (provided: any) => ({
          ...provided,
          background: '#10161b',
          borderRadius: '8px',
          backdropFilter: 'blur(4px)',
          padding: '4px',
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#2d3749' : '',
          color: state.isSelected ? '#fff' : 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.1)',
          borderRadius: '4px',
          _hover: {
            backgroundColor: '#2d3749',
          },
        }),
      }}
    />
  );
}

export default CustionSelect;
