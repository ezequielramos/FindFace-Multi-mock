import { Express, Request, Response } from 'express';
import { generateNewToken } from '../services/token';

const createdDate = new Date();

function loadAuthRoutes(app: Express) {

    app.post('/auth/login/', async (req: Request, res: Response) => {

        if (!req.body.uuid) {
            return res.status(400).json({
                'traceback': '',
                'code': 'BAD_PARAM',
                'desc': 'This field is required.',
                'param': 'uuid'
            });
        }

        if (!req.headers.authorization) {
            return res.status(401).json({
                'code': 'UNAUTHORIZED',
                'desc': 'Authentication credentials were not provided.'
            });

        }

        const base64Auth = req.headers.authorization.replace('Basic ', '');
        if (atob(base64Auth) != 'admin:admin') {
            return res.status(401).json({
                'code': 'UNAUTHORIZED',
                'desc': 'Invalid username/password.'
            });
        }

        const generatedToken = generateNewToken();

        return res.status(200).json({
            'user': {
                'id': 1,
                'active': true,
                'created_date': createdDate.toISOString(),
                'groups': [],
                'modified_date': createdDate.toISOString(),
                'permissions': [
                    'auth.add_group',
                    'auth.change_group',
                    'auth.delete_group',
                    'auth.view_group',
                    'ffsecurity.add_adgroupguid',
                    'ffsecurity.change_adgroupguid',
                    'ffsecurity.delete_adgroupguid',
                    'ffsecurity.view_adgroupguid',
                    'ffsecurity.add_deviceblacklistrecord',
                    'ffsecurity.change_deviceblacklistrecord',
                    'ffsecurity.delete_deviceblacklistrecord',
                    'ffsecurity.view_deviceblacklistrecord',
                    'ffsecurity.add_ffsecauthsession',
                    'ffsecurity.change_ffsecauthsession',
                    'ffsecurity.delete_all_own_sessions',
                    'ffsecurity.delete_ffsecauthsession',
                    'ffsecurity.view_all_own_sessions',
                    'ffsecurity.view_ffsecauthsession',
                    'ffsecurity.add_permission',
                    'ffsecurity.change_permission',
                    'ffsecurity.delete_permission',
                    'ffsecurity.view_permission',
                    'ffsecurity.add_user',
                    'ffsecurity.change_user',
                    'ffsecurity.delete_user',
                    'ffsecurity.view_user',
                    'ffsecurity.add_userkeyvalue',
                    'ffsecurity.change_userkeyvalue',
                    'ffsecurity.delete_userkeyvalue',
                    'ffsecurity.view_userkeyvalue',
                    'knox.add_authtoken',
                    'knox.change_authtoken',
                    'knox.delete_authtoken',
                    'knox.view_authtoken',
                    'sessions.add_session',
                    'sessions.change_session',
                    'sessions.delete_session',
                    'sessions.view_session',
                    'admin.add_logentry',
                    'admin.change_logentry',
                    'admin.delete_logentry',
                    'admin.view_logentry',
                    'ffsecurity.add_auditlog',
                    'ffsecurity.change_auditlog',
                    'ffsecurity.delete_auditlog',
                    'ffsecurity.view_auditlog',
                    'ffsecurity.add_area',
                    'ffsecurity.change_area',
                    'ffsecurity.delete_area',
                    'ffsecurity.view_area',
                    'ffsecurity.add_areacameralink',
                    'ffsecurity.change_areacameralink',
                    'ffsecurity.delete_areacameralink',
                    'ffsecurity.view_areacameralink',
                    'ffsecurity.add_areatriggeractivation',
                    'ffsecurity.change_areatriggeractivation',
                    'ffsecurity.delete_areatriggeractivation',
                    'ffsecurity.view_areatriggeractivation',
                    'ffsecurity.add_areatriggerrecord',
                    'ffsecurity.change_areatriggerrecord',
                    'ffsecurity.delete_areatriggerrecord',
                    'ffsecurity.view_areatriggerrecord',
                    'ffsecurity.add_bodycluster',
                    'ffsecurity.change_bodycluster',
                    'ffsecurity.delete_bodycluster',
                    'ffsecurity.view_bodycluster',
                    'ffsecurity.add_bodyclusterevent',
                    'ffsecurity.change_bodyclusterevent',
                    'ffsecurity.delete_bodyclusterevent',
                    'ffsecurity.view_bodyclusterevent',
                    'ffsecurity.add_bodyevent',
                    'ffsecurity.change_bodyevent',
                    'ffsecurity.delete_bodyevent',
                    'ffsecurity.view_bodyevent',
                    'ffsecurity.add_bodyobject',
                    'ffsecurity.change_bodyobject',
                    'ffsecurity.delete_bodyobject',
                    'ffsecurity.view_bodyobject',
                    'ffsecurity.add_camera',
                    'ffsecurity.change_camera',
                    'ffsecurity.delete_camera',
                    'ffsecurity.view_camera',
                    'ffsecurity.add_cameragroup',
                    'ffsecurity.change_cameragroup',
                    'ffsecurity.delete_cameragroup',
                    'ffsecurity.view_cameragroup',
                    'ffsecurity.add_carcard',
                    'ffsecurity.change_carcard',
                    'ffsecurity.delete_carcard',
                    'ffsecurity.view_carcard',
                    'ffsecurity.add_carcardattachment',
                    'ffsecurity.change_carcardattachment',
                    'ffsecurity.delete_carcardattachment',
                    'ffsecurity.view_carcardattachment',
                    'ffsecurity.add_carcluster',
                    'ffsecurity.change_carcluster',
                    'ffsecurity.delete_carcluster',
                    'ffsecurity.view_carcluster',
                    'ffsecurity.add_carclusterevent',
                    'ffsecurity.change_carclusterevent',
                    'ffsecurity.delete_carclusterevent',
                    'ffsecurity.view_carclusterevent',
                    'ffsecurity.add_carepisode',
                    'ffsecurity.change_carepisode',
                    'ffsecurity.delete_carepisode',
                    'ffsecurity.view_carepisode',
                    'ffsecurity.add_carevent',
                    'ffsecurity.change_carevent',
                    'ffsecurity.delete_carevent',
                    'ffsecurity.view_carevent',
                    'ffsecurity.add_carobject',
                    'ffsecurity.change_carobject',
                    'ffsecurity.delete_carobject',
                    'ffsecurity.view_carobject',
                    'ffsecurity.add_case',
                    'ffsecurity.change_case',
                    'ffsecurity.delete_case',
                    'ffsecurity.view_case',
                    'ffsecurity.add_caseattachment',
                    'ffsecurity.change_caseattachment',
                    'ffsecurity.delete_caseattachment',
                    'ffsecurity.view_caseattachment',
                    'ffsecurity.add_caseparticipant',
                    'ffsecurity.change_caseparticipant',
                    'ffsecurity.delete_caseparticipant',
                    'ffsecurity.view_caseparticipant',
                    'ffsecurity.add_caseparticipantattachment',
                    'ffsecurity.change_caseparticipantattachment',
                    'ffsecurity.delete_caseparticipantattachment',
                    'ffsecurity.view_caseparticipantattachment',
                    'ffsecurity.add_casepermission',
                    'ffsecurity.change_casepermission',
                    'ffsecurity.delete_casepermission',
                    'ffsecurity.view_casepermission',
                    'ffsecurity.add_clusterizationjob',
                    'ffsecurity.change_clusterizationjob',
                    'ffsecurity.delete_clusterizationjob',
                    'ffsecurity.view_clusterizationjob',
                    'ffsecurity.add_counter',
                    'ffsecurity.change_counter',
                    'ffsecurity.delete_counter',
                    'ffsecurity.view_counter',
                    'ffsecurity.add_counterrecord',
                    'ffsecurity.change_counterrecord',
                    'ffsecurity.delete_counterrecord',
                    'ffsecurity.view_counterrecord',
                    'ffsecurity.add_eventsstats',
                    'ffsecurity.change_eventsstats',
                    'ffsecurity.delete_eventsstats',
                    'ffsecurity.view_eventsstats',
                    'ffsecurity.add_externalvms',
                    'ffsecurity.change_externalvms',
                    'ffsecurity.delete_externalvms',
                    'ffsecurity.view_externalvms',
                    'ffsecurity.add_externalvmsevent',
                    'ffsecurity.change_externalvmsevent',
                    'ffsecurity.delete_externalvmsevent',
                    'ffsecurity.view_externalvmsevent',
                    'ffsecurity.add_externalvmssendeventstatus',
                    'ffsecurity.change_externalvmssendeventstatus',
                    'ffsecurity.delete_externalvmssendeventstatus',
                    'ffsecurity.view_externalvmssendeventstatus',
                    'ffsecurity.add_facecluster',
                    'ffsecurity.change_facecluster',
                    'ffsecurity.delete_facecluster',
                    'ffsecurity.view_facecluster',
                    'ffsecurity.add_faceclusterevent',
                    'ffsecurity.change_faceclusterevent',
                    'ffsecurity.delete_faceclusterevent',
                    'ffsecurity.view_faceclusterevent',
                    'ffsecurity.add_faceevent',
                    'ffsecurity.change_faceevent',
                    'ffsecurity.delete_faceevent',
                    'ffsecurity.view_faceevent',
                    'ffsecurity.add_faceobject',
                    'ffsecurity.change_faceobject',
                    'ffsecurity.delete_faceobject',
                    'ffsecurity.view_faceobject',
                    'ffsecurity.add_humancard',
                    'ffsecurity.batchupload_cards',
                    'ffsecurity.change_humancard',
                    'ffsecurity.delete_humancard',
                    'ffsecurity.view_humancard',
                    'ffsecurity.add_humancardattachment',
                    'ffsecurity.change_humancardattachment',
                    'ffsecurity.delete_humancardattachment',
                    'ffsecurity.view_humancardattachment',
                    'ffsecurity.add_humanepisode',
                    'ffsecurity.change_humanepisode',
                    'ffsecurity.delete_humanepisode',
                    'ffsecurity.view_humanepisode',
                    'ffsecurity.add_line',
                    'ffsecurity.change_line',
                    'ffsecurity.delete_line',
                    'ffsecurity.view_line',
                    'ffsecurity.add_metadictionary',
                    'ffsecurity.change_metadictionary',
                    'ffsecurity.delete_metadictionary',
                    'ffsecurity.view_metadictionary',
                    'ffsecurity.add_metadictionaryvalue',
                    'ffsecurity.change_metadictionaryvalue',
                    'ffsecurity.delete_metadictionaryvalue',
                    'ffsecurity.view_metadictionaryvalue',
                    'ffsecurity.add_notification',
                    'ffsecurity.change_notification',
                    'ffsecurity.delete_notification',
                    'ffsecurity.view_notification',
                    'ffsecurity.add_onvifcamera',
                    'ffsecurity.view_onvifcamera',
                    'ffsecurity.add_outbox',
                    'ffsecurity.change_outbox',
                    'ffsecurity.delete_outbox',
                    'ffsecurity.view_outbox',
                    'ffsecurity.add_patchedpersonevent',
                    'ffsecurity.change_patchedpersonevent',
                    'ffsecurity.delete_patchedpersonevent',
                    'ffsecurity.view_patchedpersonevent',
                    'ffsecurity.add_proximitycalibrationrecord',
                    'ffsecurity.change_proximitycalibrationrecord',
                    'ffsecurity.delete_proximitycalibrationrecord',
                    'ffsecurity.view_proximitycalibrationrecord',
                    'ffsecurity.add_relation',
                    'ffsecurity.change_relation',
                    'ffsecurity.delete_relation',
                    'ffsecurity.view_relation',
                    'ffsecurity.add_relationcarcardlink',
                    'ffsecurity.change_relationcarcardlink',
                    'ffsecurity.delete_relationcarcardlink',
                    'ffsecurity.view_relationcarcardlink',
                    'ffsecurity.add_relationhumancardlink',
                    'ffsecurity.change_relationhumancardlink',
                    'ffsecurity.delete_relationhumancardlink',
                    'ffsecurity.view_relationhumancardlink',
                    'ffsecurity.add_report',
                    'ffsecurity.change_report',
                    'ffsecurity.delete_report',
                    'ffsecurity.view_report',
                    'ffsecurity.add_runtimesetting',
                    'ffsecurity.change_runtimesetting',
                    'ffsecurity.configure_ntls',
                    'ffsecurity.delete_runtimesetting',
                    'ffsecurity.view_runtimesetting',
                    'ffsecurity.add_track',
                    'ffsecurity.change_track',
                    'ffsecurity.delete_track',
                    'ffsecurity.view_track',
                    'ffsecurity.add_upload',
                    'ffsecurity.change_upload',
                    'ffsecurity.delete_upload',
                    'ffsecurity.view_upload',
                    'ffsecurity.add_uploadlist',
                    'ffsecurity.change_uploadlist',
                    'ffsecurity.create_batchupload',
                    'ffsecurity.delete_uploadlist',
                    'ffsecurity.view_uploadlist',
                    'ffsecurity.add_videoarchive',
                    'ffsecurity.change_videoarchive',
                    'ffsecurity.delete_videoarchive',
                    'ffsecurity.view_videoarchive',
                    'ffsecurity.add_videoarchiveevent',
                    'ffsecurity.change_videoarchiveevent',
                    'ffsecurity.delete_videoarchiveevent',
                    'ffsecurity.view_videoarchiveevent',
                    'ffsecurity.add_watchlist',
                    'ffsecurity.change_watchlist',
                    'ffsecurity.delete_watchlist',
                    'ffsecurity.view_watchlist',
                    'ffsecurity.add_webhook',
                    'ffsecurity.change_webhook',
                    'ffsecurity.delete_webhook',
                    'ffsecurity.view_webhook',
                    'reversion.add_revision',
                    'reversion.change_revision',
                    'reversion.delete_revision',
                    'reversion.view_revision',
                    'reversion.add_version',
                    'reversion.change_version',
                    'reversion.delete_version',
                    'reversion.view_version'
                ],
                'real_name': 'Charlie Root',
                'name': 'admin',
                'comment': '',
                'camera_group_permissions': {
                    '1': 'edit',
                    '-1': 'edit'
                },
                'watch_list_permissions': {
                    '1': 'edit',
                    '-1': 'edit'
                },
                'group_permissions': {},
                'primary_group': 1,
                'language': 'en-us',
                'has_face': false,
                'face_cover': null,
                'ad_user': false,
                'has_admin_permissions': true
            },
            'token': generatedToken.token,
            'token_expiration_datetime': generatedToken.token_expiration_datetime.toISOString()
        });

    });

}

export { loadAuthRoutes };
