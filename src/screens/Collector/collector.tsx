/** @format */

import { Container } from '../../container/container';
import Form from '../../Form/Form';
// import { UploadMaster } from '@components/UploadMaster/UploadMaster';
import { FormData, FormFieldInit } from '../../types/formTypes';
import React, { useRef, useState } from 'react';
import { LABEL_COLLECTOR } from '../../constants/Common';
import { OkGrid } from 'elab_components';
import { transformPayloadWithArray } from '../../Form/FormPayload';
import {
  ActionType,
  ColumnEvent,
  SelectedFilterData,
} from '../../types/common';
import { toast } from 'react-toastify';
import { useGetGridConfigurationQuery } from '../../services/gridConfig-service';
// import { Loader } from '@progress/kendo-react-indicators';
import { paginationPayload } from '../../utils/paginationPayload';
// import { useUpdateGridConfig } from '@utils/updatedGridColumnConfig';
import {
  useCreatePriceMutation,
  useDeletePriceMutation,
  useGetPriceQuery,
  useUpdatePriceMutation,
} from '../../services/collector-service';
import { COLLECTOR_GRID } from '../../constants/GridConfigNames';
import { getFormButtonStates } from '../../utils/accessFilter';

const formFields: FormFieldInit[] = [
  {
    id: 'itemId',
    name: 'itemId',
    type: 'text',
    label: 'Material',
    fieldType: 'Dropdown',
    required: true,
    textField: 'name',
    dataItemKey: 'id',
    taskId: 35,
    validator: true,
  },
  {
    id: 'vendorId',
    name: 'vendorId',
    label: 'Vendor',
    type: 'text',
    fieldType: 'Dropdown',
    required: true,
    textField: 'name',
    dataItemKey: 'id',
    taskId: 18,
    validator: true,
  },
  {
    id: 'orderUnitID',
    name: 'orderUnitID',
    label: 'Order Unit',
    type: 'text',
    fieldType: 'Dropdown',
    textField: 'name',
    dataItemKey: 'id',
    taskId: 25,
  },
  {
    id: 'vendorItemCode',
    name: 'vendorItemCode',
    label: 'Vendor Material No',
    type: 'text',
    fieldType: 'Input',
  },
  {
    id: 'telMob',
    name: 'telMob',
    label: 'Telephone ',
    type: 'text',
    fieldType: 'Input',
  },

  {
    id: 'baseMeasureUnitID',
    name: 'baseMeasureUnitID',
    label: 'Base Unit of Measure',
    type: 'text',
    fieldType: 'Dropdown',
    required: true,
    textField: 'name',
    dataItemKey: 'id',
    taskId: 25,
    validator: true,
  },
  {
    id: 'purchaseInfoRec',
    name: 'purchaseInfoRec',
    label: 'Purchase Info Record',
    type: 'text',
    fieldType: 'Input',
  },
  {
    id: 'purchaseOrg',
    name: 'purchaseOrg',
    label: 'Purch. Organization',
    type: 'text',
    fieldType: 'Input',
  },
  {
    id: 'purchaseGroupID',
    name: 'purchaseGroupID',
    label: 'Purchasing Group',
    type: 'text',
    fieldType: 'Dropdown',
    required: true,
    textField: 'name',
    dataItemKey: 'id',
    taskId: 20,
    validator: true,
  },
  {
    id: 'currency',
    name: 'currency',
    label: 'Currency',
    type: 'text',
    fieldType: 'Input',
    required: true,
    validator: true,
  },
  {
    id: 'netPrice',
    name: 'netPrice',
    label: 'Net Price',
    type: 'number',
    min: 0,
    fieldType: 'Input',
    required: true,
    validator: true,
  },
  {
    id: 'orderPriceUnit',
    name: 'orderPriceUnit',
    label: 'Order Price Unit ',
    type: 'text',
    fieldType: 'Input',
  },
  {
    id: 'effPrice',
    name: 'effPrice',
    label: 'Effective Price',
    type: 'number',
    min: 0,
    fieldType: 'Input',
  },
  {
    id: 'taxID',
    name: 'taxID',
    label: 'Tax Code',
    type: 'text',
    fieldType: 'Dropdown',
    required: true,
    textField: 'name',
    dataItemKey: 'id',
    taskId: 27,
    validator: true,
  },
];

const formaStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gap: '25px',
  flexWrap: 'wrap',
};

function Collector() {
  const formRef = useRef<HTMLFormElement>(null);
  const userData = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
  const { data: getGridConfiguration, isFetching: isLoadingGrid } =
    useGetGridConfigurationQuery(COLLECTOR_GRID);
  // const { handleUpdatedColumnConfig } = useUpdateGridConfig(COLLECTOR_GRID);
  const [createPrice] = useCreatePriceMutation();
  const [updatePrice] = useUpdatePriceMutation();
  const [deletePrice] = useDeletePriceMutation();
  const [editValue, setEditValue] = useState<{ [key: string]: unknown }>({});
  const [selectedFilterData, setSelectedFilterData] =
    useState<SelectedFilterData>();
  const buttonProps = getFormButtonStates(
    getGridConfiguration?.data?.formButtons ?? []
  );
  const payload = paginationPayload(selectedFilterData);
  const { data: getprice, isLoading: isLoadingPrice } =
    useGetPriceQuery(payload);
  const formOnchange = (): void => {};
  const handleSubmit = async (data: FormData) => {
    const result = transformPayloadWithArray(data, formFields);
    let payload = {
      ...result,
      orderUnitID:
        result.orderUnitID === '' || result.orderUnitID === null
          ? 0
          : result.orderUnitID,
      createdUserID: userData.userID,
      modifiedUserId: 0,
    };
    // if (editValue == null) {
    //   createPrice(payload)
    //     .unwrap()
    //     .then((respond: any) => {
    //       toast.success(respond.message);
    //       setEditValue(null);
    //       formRef.current.resetForm();
    //     })
    //     .catch((error) => {
    //       toast.error(error?.data?.message || 'Failed to create Price master');
    //     });
    // } else {
    //   const payload = {
    //     ...result,
    //     priceID: editValue.priceID,
    //     createdUserID: userData.userID,
    //     modifiedUserID: userData.userID,
    //     purchaseGroupID:
    //       result.purchaseGroupID === '' || result.purchaseGroupID === null
    //         ? 0
    //         : result.purchaseGroupID,
    //   };
    //   updatePrice(payload)
    //     .unwrap()
    //     .then((respond: any) => {
    //       toast.success(respond.message);
    //       setEditValue(null);
    //       formRef.current.resetForm();
    //     })
    //     .catch((error) => {
    //       toast.error(error?.data?.message || 'Failed to Update Price master');
    //     });
    // }
    // setEditValue(null);
    // formRef.current.resetForm();
  };
  const handelGridData = (
    data: React.SetStateAction<{ [key: string]: unknown }>,
    item: ActionType
  ) => {
    setEditValue(data);
  };
  const handleExternalButtons = (ev: {
    selectedState: Record<
      string,
      { priceID: number; modifiedByUserID: number }
    >;
  }) => {
    const selectedItems = Object.values(
      ev.selectedState as Record<
        string,
        { priceID: number; modifiedByUserID: number }
      >
    );
    if (selectedItems.length === 0) {
      toast.error('Please select at least one row to delete');
      return;
    }
    const payload = selectedItems.map((item) => ({
      priceID: item.priceID,
      modifiedUserId: userData?.userID || 1,
    }));
    // deletePrice(payload)
    //   .unwrap()
    //   .then((respond: any) => {
    //     toast.success(respond.message);
    //     setEditValue(null);
    //     formRef.current.resetForm();
    //   })
    //   .catch((error) => {
    //     toast.error(error?.data?.message || 'Failed to delete Price Master');
    //   });
    // setSelectedFilterData({});
  };
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='container-main-heading-text'>{LABEL_COLLECTOR}</div>
        {/* <UploadMaster buttonProps={buttonProps} /> */}
      </div>
      {isLoadingPrice || isLoadingGrid ? (
        <div style={{ textAlign: 'center', margin: 'auto' }}>
          {/* <Loader size='large' type='converging-spinner' /> */}
        </div>
      ) : (
        <>
          {getGridConfiguration?.data?.formFields !== undefined && (
            <div className='container-paper'>
              <Form
                formaStyle={formaStyle}
                formField={getGridConfiguration?.data?.formFields ?? []}
                handleSubmit={handleSubmit}
                formOnchange={formOnchange}
                editValue={editValue}
                setEditValue={setEditValue}
                formRef={formRef}
                buttonProps={buttonProps}
              />
            </div>
          )}
          <div
            style={{
              marginTop: '26px',
            }}
          >
            {getGridConfiguration?.data &&
              // <OkGrid
              // data={getprice?.data || []}
              // {...getGridConfiguration.data}
              // totalCount={getprice?.data?.[0]?.totalCount}
              // handleExternalButtons={handleExternalButtons}
              // isLoading={isLoadingPrice || isLoadingGrid}
              // handleGridData={handelGridData}
              // selectedFilterData={selectedFilterData}
              // setSelectedFilterData={setSelectedFilterData}
              // handleUpdatedColumnConfig={(e: Array<ColumnEvent>) =>
              //   handleUpdatedColumnConfig(e, getGridConfiguration)
              // }
              // allData={{
              //   data: getprice?.data,
              //   isLoading: isLoadingPrice,
              // }}
              // />
              {}}{' '}
          </div>
        </>
      )}
    </Container>
  );
}

export { Collector };
