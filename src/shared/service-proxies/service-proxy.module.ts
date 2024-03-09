import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.ApplicantServiceProxy,
        ApiServiceProxies.EducationServiceProxy,
        ApiServiceProxies.ExperienceServiceProxy,
        ApiServiceProxies.TrainingServiceProxy,
        ApiServiceProxies.CertificateAwardedServiceProxy,
        ApiServiceProxies.ProjectServiceProxy,
        ApiServiceProxies.CoverLetterServiceProxy,
        ApiServiceProxies.SkillServiceProxy,
        ApiServiceProxies.LanguageServiceProxy,
        ApiServiceProxies.JobServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
