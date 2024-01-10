import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  styled,
  Text,
} from '@chakra-ui/react';
import ModalDialog from 'components/modal';
import { useEvaluate } from 'hooks/task/evaluate';
import { IoIosAdd } from 'react-icons/io';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import styles from './index.module.scss';
import _ from 'lodash';

export default function Evaluate(props: {
  isOpen?: boolean;
  onClose?: () => void;
  projectId: string;
  onSuccess: () => void;
}) {
  const { isOpen, onClose, projectId, onSuccess } = props;
  const {
    fields,
    append,
    remove,
    // totalCnys,
    totalUsdt,
    // cnys,
    errors,
    register,
    handleSure,
    setValue,
    getValues,
    isLoading,
  } = useEvaluate(projectId, () => {
    onClose();
    onSuccess();
  });

  return (
    <ModalDialog
      title="参与评估"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="评估质押"
      onSure={handleSure}
      isLoading={isLoading}
    >
      <Box>
        <Text fontSize="lg">任务清单</Text>
        <Box background="rgba(255,255,255,0.05)" padding="10px" margin="10px 0 20px 0">
          <Flex justify="space-between">
            <Flex width="100px" alignItems="center" justifyContent="center">
              Serial Number
            </Flex>
            <Flex alignItems="center" justifyContent="center" width="400px">
              Task Name
            </Flex>
            <Flex alignItems="center" justifyContent="center" width="400px">
              Cost（USDT）
            </Flex>
            {/* <Flex width="100px" alignItems="center" justifyContent="center" >价值(CNY)</Flex> */}
            <Flex width="100px" alignItems="center" justifyContent="center">
              操作
            </Flex>
          </Flex>
          {fields.map((it, index) => {
            return (
              <Flex key={`line_${index}`} justify="space-between" padding="10px 0">
                <Flex alignItems="center" justifyContent="center" width="100px">
                  {index + 1}
                </Flex>
                <Flex alignItems="center" justifyContent="center" width="400px" paddingRight="10px">
                  <FormControl isInvalid={!!errors?.datas?.[index]?.taskname} isRequired>
                    <Input
                      id={`id.${index}.taskname`}
                      name={`datas.${index}.taskname`}
                      color="#fff"
                      placeholder="请输入任务名称"
                      size="md"
                      {...register(`datas.${index}.taskname`, { required: true })}
                    />
                    <FormErrorMessage>
                      {errors?.datas?.[index]?.taskname && (
                        <>{errors?.datas?.[index]?.taskname.message}</>
                      )}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex alignItems="center" justifyContent="center" width="400px" paddingRight="10px">
                  <FormControl isInvalid={!!errors?.datas?.[index]?.usdt} isRequired>
                    <Input
                      id={`id.${index}.usdt`}
                      name={`datas.${index}.usdt`}
                      color="#fff"
                      type="number"
                      placeholder="请输入"
                      size="md"
                      {...register(`datas.${index}.usdt`, { required: true, min: 0 })}
                    />
                    <FormErrorMessage>
                      {errors?.datas?.[index]?.usdt && <>{errors?.datas?.[index]?.usdt.message}</>}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                {/* <Flex width="100px" alignItems="center" justifyContent="center" >{cnys[index]}</Flex> */}
                <Flex width="100px" alignItems="center" justifyContent="center">
                  <Link color="#7551FF" onClick={() => remove(index)}>
                    删除
                  </Link>
                </Flex>
              </Flex>
            );
          })}
          <Link
            onClick={() => append({ taskname: '', usdt: '' })}
            color="#7551FF"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IoIosAdd />
            添加任务
          </Link>
          <Flex width="70%" justifyContent="space-between" padding="20px 0 0 20px">
            <Text fontSize="lg">报酬合计</Text>
            <Text color="#7551FF" fontSize="20px" fontWeight="bold">
              {totalUsdt} USDT
            </Text>
            {/* <Text color="#7551FF" fontSize="20px" fontWeight="bold">{totalCnys} CNY</Text> */}
          </Flex>
        </Box>
      </Box>
      <Box>
        <Text fontSize="lg">Estimated Completion Time</Text>
        <Box margin="10px 0 20px 0" className={styles.datepicker}>
          <SingleDatepicker
            name="date-input"
            date={getValues().endTime}
            onDateChange={(date) => setValue('endTime', date)}
            {...register('endTime', { required: true })}
          />
          <Text fontSize="lg" margin="10px 0 0 0">
            需质押USDT数量
          </Text>
          <InputGroup margin="10px 0 5px 0">
            <InputRightElement>USDT</InputRightElement>
            <Input
              name="need-usdt"
              isReadOnly
              value={(Number(totalUsdt) * 0.1).toFixed(2)}
              color="#fff"
            ></Input>
          </InputGroup>
          <Text fontSize="xs" color="#7551FF">
            质押数量=Total Cost*10%
          </Text>
        </Box>
      </Box>
    </ModalDialog>
  );
}
