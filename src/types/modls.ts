export interface RoleMaster {
    roleId: number;
    roleName: string;
    description?: string;
    isDeleted: boolean;
    createdDate: string;
  }
  
  export interface AdminMaster {
    adminId: number;
    name: string;
    email: string;
    roleId: number; // should be 1 for Admin
    isDeleted: boolean;
    createdDate: string;
  }
  
  export interface CollectorMaster {
    collectorId: number;
    name: string;
    email: string;
    contactInfo?: string;
    roleId: number; // 2 for collector
    status: string;
    createdDate: string;
    isDeleted: boolean;
  }
  
  export interface FarmerMaster {
    farmerId: number;
    name: string;
    email: string;
    contactInfo?: string;
    address?: string;
    bankIFSC?: string;
    bankAccountHolderName?: string;
    bankAccountNumber?: string;
    roleId: number; // 3 for farmer
    isDeleted: boolean;
    createdDate: string;
  }
  
  export interface MilkCollectionMaster {
    milkCollectionId: number;
    collectorId?: number;
    farmerId?: number;
    collectionDate: string;
    quantityLitres: number;
    fatContent?: number;
    snfContent?: number;
    isApproved: boolean;
    approvalDate?: string;
    approvedByAdminId?: number;
    isDeleted: boolean;
    createdDate: string;
  }
  
  export interface FarmerPaymentMaster {
    paymentId: number;
    farmerId?: number;
    paymentStartDate: string;
    paymentEndDate: string;
    amount: number;
    status: string;
    createdByCollectorId?: number;
    isDeleted: boolean;
    createdDate: string;
  }
  