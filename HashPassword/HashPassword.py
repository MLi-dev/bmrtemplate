__author__ = 'Curt'
import hashlib                  # MD5 for password
import base64                   # Base64 encoding
import sys                      # Exit codes
import locale                   # Number formatting

#  CONFIGS
EIDR_LOGIN = '10.5238/mli'
EIDR_PARTYID = '10.5237/9241-BC57'
EIDR_PASSWORD = "ygw9F8hOxlJCPvBK"
#

#
#
locale.setlocale(locale.LC_ALL, '')


def makeHeader():
    try:
        pwBytes = bytes(EIDR_PASSWORD, 'utf-8')
        hash = hashlib.md5(pwBytes)
        pwShadow = base64.b64encode(hash.digest())
        authStr = 'Eidr ' + EIDR_LOGIN + ':' + \
            EIDR_PARTYID + ':' + pwShadow.decode('utf-8')
        return authStr
    except Exception as e:
        print('ERR! ' + str(e))
        raise


# ------------------------------  The meat
try:
    print(makeHeader())
    sys.exit(0)
except Exception as E:
    print("Feh!")
