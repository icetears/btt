import libtorrent as lt
import time
import sys

ses = lt.session()
ses.listen_on(6881, 6891)


def url():
    params = {
        'save_path': '/tmp/downloads/',
        'storage_mode': lt.storage_mode_t(2),
        'paused': False,
        'auto_managed': True,
        'duplicate_is_error': True}
    link = "magnet:?xt=urn:btih:6dde4c069bf576f7f67b3b3f7443f08b3bdcf0d0&dn=%5Bwww.hdmayi.com%5D%5B%E7%96%AF%E7%8B%82%E5%8A%A8%E7%89%A9%E5%9F%8E%5D%5B1080P.BD-RMVB%5D%5B%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AD%97%E5%B9%95%5D"
    handle = lt.add_magnet_uri(ses, link, params)
    ses.start_dht()
    
    print 'downloading metadata...'
    while (not handle.has_metadata()):
        time.sleep(1)
    print 'got metadata, starting torrent download...'
    while (handle.status().state != lt.torrent_status.seeding):
        s = handle.status()
        state_str = ['queued', 'checking', 'downloading metadata', \
                    'downloading', 'finished', 'seeding', 'allocating']
        print '%.2f%% complete (down: %.1f kb/s up: %.1f kB/s peers: %d) %s %.3' % \
                    (s.progress * 100, s.download_rate / 1000, s.upload_rate / 1000, \
                    s.num_peers, state_str[s.state], s.total_download/1000000)
        time.sleep(5)

def torrent():
    e = lt.bdecode(open("/home/xiao/work/cloud/2016-05-27-raspbian-jessie.zip.torrent", 'rb').read())
    info = lt.torrent_info(e)
    
    h = ses.add_torrent(info, "/tmp")
    print 'downloading metadata...'
    while (not h.has_metadata()):
        time.sleep(1)
    print 'got metadata, starting torrent download...'
    
    while (not h.is_seed()):
        s = h.status()
    
        #state_str = ['queued', 'checking', 'downloading metadata', \
        #'downloading', 'finished', 'seeding', 'allocating', 'checking fastresume']
        state_str = ['queued', 'checking', 'downloading metadata', \
                    'downloading', 'finished', 'seeding', 'allocating']
        #print s.download_rate
        sys.stdout.write( '%.2f%% complete (down: %.1f kb/s up: %.1f kB/s peers: %d) %s\r' % \
                (s.progress * 100, s.download_rate / 1000, s.upload_rate / 1000, \
                s.num_peers, state_str[s.state]))
        sys.stdout.flush()
    
        time.sleep(1)

torrent()
