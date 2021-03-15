// import { container } from 'tsyringe';

// import IStorageProvider from './StorageProvider/models/IStorageProvider';
// import DiskProvider from './StorageProvider/implementations/DiskProvider';

// import IMailProvider from './MailProvider/models/IMailProvider';
// import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

// import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
// import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';


// container.registerSingleton<IStorageProvider>(
//    'StorageProvider',
//    DiskProvider
// );

// container.registerSingleton<IMailTemplateProvider>(
//    'MailTemplateProvider',
//    HandlebarsMailTemplateProvider
// );

// container.registerInstance<IMailProvider>(
//    'MailProvider',
//    container.resolve(EtherealMailProvider)
// );

import './MailTemplateProvider';
import './MailProvider';
import './StorageProvider';
