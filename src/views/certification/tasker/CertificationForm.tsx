import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import styles from './index.module.scss';

const CertificationForm = () => {
  return (
    <div className={styles.certificationForm}>
      <h2 className="font-20 font-bold mb-4">Tasker认证</h2>
      <h3 className="font-16 font-bold mb-2">基础信息</h3>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>认证职位类型（最多选择2个）</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>工作经验</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>当前工作区域</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>联系电话</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>邮箱</FormLabel>
        <Input type="email" />
      </FormControl>

      <h3 className="font-16 font-bold mb-2">技能标签</h3>
      <FormControl className="mb-4">
        <Input type="email" />
      </FormControl>

      <h3 className="font-16 font-bold mb-2">工作经历</h3>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>公司名称</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>就职时间</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>部门名称</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>职位名称</FormLabel>
        <Input type="email" />
      </FormControl>

      <h3 className="font-16 font-bold mb-2">工作经历</h3>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>公司名称</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>就职时间</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>部门名称</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel fontSize={12}>职位名称</FormLabel>
        <Input type="email" />
      </FormControl>
      <div className="flex justify-center">
        <Button mt={4} className="theme-button" type="submit">
          申请成为Tasker
        </Button>
      </div>
    </div>
  );
};

export default CertificationForm;
